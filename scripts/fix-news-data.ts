#!/usr/bin/env tsx
/**
 * Script de migração para normalizar dados de notícias
 *
 * Este script garante que todos os documentos na coleção news_articles tenham:
 * - category: 'saude-mental' (se não existir)
 * - isActive: true (se não existir)
 *
 * Uso:
 *   npx tsx scripts/fix-news-data.ts
 *
 * Certifique-se de que as variáveis MONGODB_URI e MONGODB_DB_NAME estão configuradas
 */

import { MongoClient } from 'mongodb';

async function main() {
  const uri =
    process.env.MONGODB_URI ||
    'mongodb+srv://sindiprosan-admin:dAEzFpfT3TadOWEo@sindiprosan-cluster.av13xqm.mongodb.net/?appName=sindiprosan-cluster';
  const dbName = process.env.MONGODB_DB_NAME || 'psychiatric_care_db';

  if (!uri || !dbName) {
    console.error('❌ MONGODB_URI ou MONGODB_DB_NAME não configurados');
    process.exit(1);
  }

  console.log('🔄 Conectando ao MongoDB...');
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('✅ Conectado ao MongoDB');

    const db = client.db(dbName);
    const collection = db.collection('news_articles');

    // 1. Verificar estado atual
    console.log('\n📊 Analisando estado atual dos documentos...');
    const total = await collection.countDocuments({});
    const withoutCategory = await collection.countDocuments({
      category: { $exists: false },
    });
    const withoutIsActive = await collection.countDocuments({
      isActive: { $exists: false },
    });
    const inactive = await collection.countDocuments({ isActive: false });

    console.log(`Total de documentos: ${total}`);
    console.log(`Sem campo 'category': ${withoutCategory}`);
    console.log(`Sem campo 'isActive': ${withoutIsActive}`);
    console.log(`Com isActive: false: ${inactive}`);

    if (total === 0) {
      console.log('\n⚠️  Nenhum documento encontrado na coleção');
      return;
    }

    // 2. Exibir alguns exemplos
    console.log('\n📄 Exemplos de documentos:');
    const samples = await collection.find({}).limit(3).toArray();
    samples.forEach((doc, idx) => {
      console.log(`\nDocumento ${idx + 1}:`);
      console.log(`  _id: ${doc._id}`);
      console.log(`  title: ${doc.title || 'N/A'}`);
      console.log(`  slug: ${doc.slug || 'N/A'}`);
      console.log(`  category: ${doc.category || 'MISSING'}`);
      console.log(`  isActive: ${doc.isActive !== undefined ? doc.isActive : 'MISSING'}`);
    });

    // 3. Aplicar correções
    console.log('\n🔧 Aplicando correções...\n');

    // Atualizar documentos sem category
    if (withoutCategory > 0) {
      console.log(`Atualizando ${withoutCategory} documentos sem 'category'...`);
      const result1 = await collection.updateMany(
        { category: { $exists: false } },
        { $set: { category: 'saude-mental' } }
      );
      console.log(`✅ ${result1.modifiedCount} documentos atualizados com category`);
    }

    // Atualizar documentos sem isActive
    if (withoutIsActive > 0) {
      console.log(`Atualizando ${withoutIsActive} documentos sem 'isActive'...`);
      const result2 = await collection.updateMany(
        { isActive: { $exists: false } },
        { $set: { isActive: true } }
      );
      console.log(`✅ ${result2.modifiedCount} documentos atualizados com isActive`);
    }

    // Informar sobre documentos inativos (não altera)
    if (inactive > 0) {
      console.log(
        `\n⚠️  ${inactive} documentos estão com isActive: false (não serão alterados automaticamente)`
      );
    }

    // 4. Verificar estado final
    console.log('\n📊 Estado final dos documentos:');
    const finalSamples = await collection.find({}).limit(3).toArray();
    finalSamples.forEach((doc, idx) => {
      console.log(`\nDocumento ${idx + 1}:`);
      console.log(`  _id: ${doc._id}`);
      console.log(`  title: ${doc.title || 'N/A'}`);
      console.log(`  slug: ${doc.slug || 'N/A'}`);
      console.log(`  category: ${doc.category}`);
      console.log(`  isActive: ${doc.isActive}`);
    });

    console.log('\n✅ Migração concluída com sucesso!');
  } catch (error) {
    console.error('❌ Erro durante a migração:', error);
    process.exit(1);
  } finally {
    await client.close();
    console.log('\n🔌 Conexão fechada');
  }
}

main();
