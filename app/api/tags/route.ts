/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { getTagsCollection, getNewsCollection } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import {
  createTagSchema,
  updateTagSchema,
  deleteTagSchema,
} from '@/lib/validations/tags';

// GET - Listar tags
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const activeOnly = searchParams.get('activeOnly') === 'true';
    const all = searchParams.get('all') === 'true';
    const search = searchParams.get('search') || '';
    const status = searchParams.get('status') || '';
    const limit = parseInt(searchParams.get('limit') || '50');
    const page = parseInt(searchParams.get('page') || '1');

    const collection = await getTagsCollection();
    const filter: any = {};

    // Filtro por busca
    if (search) {
      filter.name = { $regex: search, $options: 'i' };
    }

    // Filtro por status
    if (activeOnly) {
      filter.isActive = true;
    } else if (all) {
      // Admin view: filtra por status se especificado
      if (status === 'active') {
        filter.isActive = true;
      } else if (status === 'inactive') {
        filter.isActive = false;
      }
      // Se status não especificado (all), não filtra por isActive - mostra todos
    } else {
      filter.isActive = true; // Public view: apenas ativos
    }

    const skip = (page - 1) * limit;
    const total = await collection.countDocuments(filter);

    const tags = await collection
      .find(filter)
      .sort({ order: 1, name: 1 })
      .skip(skip)
      .limit(limit)
      .toArray();

    // Para admin, adiciona contagem de uso
    if (all) {
      const newsCollection = await getNewsCollection();
      const tagsWithCount = await Promise.all(
        tags.map(async (tag) => {
          const count = await newsCollection.countDocuments({
            tag: tag.name,
          });
          return {
            ...tag,
            _id: tag._id.toString(),
            usageCount: count,
          };
        })
      );

      return NextResponse.json({
        tags: tagsWithCount,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit),
        },
      });
    }

    return NextResponse.json({
      tags: tags.map((t) => ({ ...t, _id: t._id.toString() })),
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Erro ao buscar tags:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar tags' },
      { status: 500 }
    );
  }
}

// POST - Criar tag
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });
    }

    const body = await request.json();
    const validated = createTagSchema.parse(body);

    const collection = await getTagsCollection();

    // Gera slug se não fornecido
    let slug = validated.slug;
    if (!slug) {
      slug = validated.name
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
    }

    // Verifica duplicatas
    const existing = await collection.findOne({
      $or: [{ name: validated.name }, { slug }],
    });

    if (existing) {
      return NextResponse.json(
        { error: 'Tag com este nome ou slug já existe' },
        { status: 409 }
      );
    }

    // Auto-assign order se não fornecido
    let order = validated.order;
    if (!order) {
      const maxTag = await collection
        .find()
        .sort({ order: -1 })
        .limit(1)
        .toArray();
      order = maxTag.length > 0 ? (maxTag[0].order || 0) + 1 : 1;
    }

    const tagData = {
      ...validated,
      slug,
      order,
      createdBy: (session.user as any).id,
      updatedBy: (session.user as any).id,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await collection.insertOne(tagData as any);

    return NextResponse.json({
      id: result.insertedId.toString(),
      message: 'Tag criada com sucesso',
    });
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Dados inválidos', details: error.errors },
        { status: 400 }
      );
    }
    console.error('Erro ao criar tag:', error);
    return NextResponse.json({ error: 'Erro ao criar tag' }, { status: 500 });
  }
}

// PUT - Atualizar tag
export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });
    }

    const body = await request.json();
    const validated = updateTagSchema.parse(body);

    const collection = await getTagsCollection();
    const { _id, ...updateData } = validated;

    // Se o nome mudou, atualiza todas as notícias que usam esta tag
    if (updateData.name) {
      const currentTag = await collection.findOne({
        _id: new ObjectId(_id),
      });

      if (!currentTag) {
        return NextResponse.json(
          { error: 'Tag não encontrada' },
          { status: 404 }
        );
      }

      // Verifica duplicatas (excluindo a tag atual)
      const duplicate = await collection.findOne({
        _id: { $ne: new ObjectId(_id) },
        $or: [
          { name: updateData.name },
          { slug: updateData.slug || updateData.name },
        ],
      });

      if (duplicate) {
        return NextResponse.json(
          { error: 'Tag com este nome ou slug já existe' },
          { status: 409 }
        );
      }

      // Atualiza notícias com o novo nome da tag
      if (currentTag.name !== updateData.name) {
        const newsCollection = await getNewsCollection();
        const updateResult = await newsCollection.updateMany(
          { tag: currentTag.name },
          { $set: { tag: updateData.name } }
        );

        console.log(
          `Atualizadas ${updateResult.modifiedCount} notícias com nova tag`
        );
      }

      // Regenera slug se nome mudou
      if (!updateData.slug) {
        (updateData as any).slug = updateData.name
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-+|-+$/g, '');
      }
    }

    (updateData as any).updatedBy = (session.user as any).id;
    (updateData as any).updatedAt = new Date();

    const result = await collection.updateOne(
      { _id: new ObjectId(_id) },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { error: 'Tag não encontrada' },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: 'Tag atualizada com sucesso' });
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Dados inválidos', details: error.errors },
        { status: 400 }
      );
    }
    console.error('Erro ao atualizar tag:', error);
    return NextResponse.json(
      { error: 'Erro ao atualizar tag' },
      { status: 500 }
    );
  }
}

// DELETE - Deletar tag (hard delete)
export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });
    }

    const body = await request.json();
    const validated = deleteTagSchema.parse(body);

    const collection = await getTagsCollection();

    // Busca a tag
    const tag = await collection.findOne({ _id: new ObjectId(validated._id) });

    if (!tag) {
      return NextResponse.json(
        { error: 'Tag não encontrada' },
        { status: 404 }
      );
    }

    // Verifica se a tag está em uso (proteção de integridade)
    const newsCollection = await getNewsCollection();
    const usageCount = await newsCollection.countDocuments({
      tag: tag.name,
    });

    if (usageCount > 0) {
      return NextResponse.json(
        {
          error: `Não é possível excluir esta tag. Ela está sendo usada em ${usageCount} notícia(s). Remova a tag das notícias ou atribua outra tag antes de excluí-la.`,
          usageCount,
        },
        { status: 400 }
      );
    }

    // Hard delete: remove permanentemente do banco
    const result = await collection.deleteOne({
      _id: new ObjectId(validated._id),
    });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { error: 'Erro ao excluir tag' },
        { status: 500 }
      );
    }

    return NextResponse.json({ message: 'Tag excluída com sucesso' });
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Dados inválidos', details: error.errors },
        { status: 400 }
      );
    }
    console.error('Erro ao excluir tag:', error);
    return NextResponse.json(
      { error: 'Erro ao excluir tag' },
      { status: 500 }
    );
  }
}
