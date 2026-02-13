import { MongoClient } from "mongodb";

// MongoDB URI hardcoded for migration script
// (from .env.local: MONGODB_URI)
const MONGODB_URI =
  "mongodb+srv://sindiprosan-admin:dAEzFpfT3TadOWEo@sindiprosan-cluster.av13xqm.mongodb.net/?appName=sindiprosan-cluster";

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI is not defined");
}

const SOURCE_DB = "sindiprosan";
const TARGET_DB = "psychiatric_care_db";
const COLLECTION_NAME = "google_reviews";

async function migrateReviews() {
  const client = new MongoClient(MONGODB_URI);

  try {
    console.log("🔌 Conectando ao MongoDB...");
    await client.connect();
    console.log("✅ Conectado com sucesso!\n");

    // Source database
    const sourceDb = client.db(SOURCE_DB);
    const sourceCollection = sourceDb.collection(COLLECTION_NAME);

    // Target database
    const targetDb = client.db(TARGET_DB);
    const targetCollection = targetDb.collection(COLLECTION_NAME);

    // Count documents in source
    const sourceCount = await sourceCollection.countDocuments();
    console.log(`📊 Database origem: ${SOURCE_DB}`);
    console.log(`   Collection: ${COLLECTION_NAME}`);
    console.log(`   Documentos encontrados: ${sourceCount}\n`);

    if (sourceCount === 0) {
      console.log("⚠️  Nenhuma review encontrada no database de origem.");
      console.log("   Verifique se as reviews estão realmente em sindiprosan.google_reviews");
      return;
    }

    // Fetch all reviews from source
    console.log("📥 Lendo reviews do database de origem...");
    const reviews = await sourceCollection.find({}).toArray();
    console.log(`✅ ${reviews.length} reviews lidas\n`);

    // Check if target collection already has data
    const targetCount = await targetCollection.countDocuments();
    if (targetCount > 0) {
      console.log(`⚠️  ATENÇÃO: Database destino já possui ${targetCount} documentos`);
      console.log("   A migração irá inserir/atualizar usando upsert por reviewId\n");
    }

    // Migrate reviews using bulk upsert
    console.log(`📤 Migrando reviews para ${TARGET_DB}.${COLLECTION_NAME}...`);

    const bulkOps = reviews.map((review) => ({
      updateOne: {
        filter: { reviewId: review.reviewId },
        update: { $set: review },
        upsert: true,
      },
    }));

    const result = await targetCollection.bulkWrite(bulkOps);

    console.log("✅ Migração concluída!");
    console.log(`   Inseridos: ${result.upsertedCount}`);
    console.log(`   Atualizados: ${result.modifiedCount}`);
    console.log(`   Total processado: ${result.upsertedCount + result.modifiedCount}\n`);

    // Create indexes
    console.log("🔧 Criando índices...");

    await targetCollection.createIndex({ reviewId: 1 }, { unique: true });
    console.log("   ✓ Índice único em reviewId");

    await targetCollection.createIndex({
      isActive: 1,
      rating: -1,
      publishedDate: -1,
    });
    console.log("   ✓ Índice composto em isActive, rating, publishedDate");

    await targetCollection.createIndex({ publishedDate: -1 });
    console.log("   ✓ Índice em publishedDate\n");

    // Final verification
    const finalCount = await targetCollection.countDocuments();
    console.log("📊 Verificação final:");
    console.log(`   ${SOURCE_DB}.${COLLECTION_NAME}: ${sourceCount} documentos`);
    console.log(`   ${TARGET_DB}.${COLLECTION_NAME}: ${finalCount} documentos\n`);

    if (finalCount === sourceCount) {
      console.log("✅ ✅ ✅ MIGRAÇÃO BEM-SUCEDIDA! ✅ ✅ ✅");
      console.log(`\n📝 Próximos passos:`);
      console.log(`   1. Teste a API: curl http://localhost:3000/api/reviews?limit=5`);
      console.log(`   2. Verifique o frontend com as reviews`);
      console.log(
        `   3. Após confirmar que tudo funciona, você pode deletar as reviews antigas de ${SOURCE_DB}`,
      );
    } else {
      console.log("⚠️  ATENÇÃO: Contagens diferentes!");
      console.log(
        "   Verifique se há reviews duplicadas ou se algo deu errado na migração",
      );
    }
  } catch (error) {
    console.error("❌ Erro durante a migração:", error);
    throw error;
  } finally {
    await client.close();
    console.log("\n🔌 Conexão fechada");
  }
}

// Run migration
migrateReviews()
  .then(() => {
    console.log("\n✅ Script finalizado com sucesso");
    process.exit(0);
  })
  .catch((error) => {
    console.error("\n❌ Script falhou:", error);
    process.exit(1);
  });
