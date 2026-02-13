/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { getNewsCollection } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import {
  createNewsSchema,
  updateNewsSchema,
  deleteNewsSchema,
} from '@/lib/validations/news';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// GET - Listar notícias (pública ou admin)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '10');
    const page = parseInt(searchParams.get('page') || '1');
    const slug = searchParams.get('slug');
    const all = searchParams.get('all') === 'true';
    const search = searchParams.get('search') || '';
    const tag = searchParams.get('tag') || '';
    const status = searchParams.get('status') || '';
    const category = searchParams.get('category') || 'saude-mental';

    const collection = await getNewsCollection();
    const filter: any = { category };

    // Filtro por slug (single article)
    if (slug) {
      // Para busca por slug, primeiro tenta sem forçar categoria
      const slugFilter: any = { slug };
      if (!all) {
        slugFilter.isActive = true;
      }

      console.log('[DEBUG] Fetching news by slug:', {
        slug,
        slugFilter: JSON.stringify(slugFilter),
        all,
      });

      let article = await collection.findOne(slugFilter);

      console.log('[DEBUG] First attempt result:', article ? 'Found' : 'Not found');

      // Se não encontrar e tiver categoria especificada, tenta com categoria
      if (!article && category) {
        console.log('[DEBUG] Trying with category filter:', category);
        slugFilter.category = category;
        article = await collection.findOne(slugFilter);
        console.log('[DEBUG] Second attempt result:', article ? 'Found' : 'Not found');
      }

      if (article) {
        console.log('[DEBUG] Article details:', {
          id: article._id,
          title: article.title,
          category: article.category,
          isActive: article.isActive,
          slug: article.slug,
        });
      }

      if (!article) {
        console.log('[DEBUG] Article not found with any filter combination');
        return NextResponse.json(
          { error: 'Article not found' },
          { status: 404 }
        );
      }

      return NextResponse.json({ news: article });
    }

    // Filtro por busca de título
    if (search) {
      filter.title = { $regex: search, $options: 'i' };
    }

    // Filtro por tag
    if (tag) {
      filter.tag = tag;
    }

    // Filtro por status (apenas admin com all=true)
    if (all) {
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

    const news = await collection
      .find(filter)
      .sort({ publishedAt: -1 })
      .skip(skip)
      .limit(limit)
      .toArray();

    return NextResponse.json({
      news,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Erro ao buscar notícias:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar notícias' },
      { status: 500 }
    );
  }
}

// POST - Criar notícia (protegido)
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });
    }

    const body = await request.json();
    const validated = createNewsSchema.parse(body);

    const collection = await getNewsCollection();

    // Gera slug único com timestamp
    const baseSlug = validated.title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');

    const timestamp = Date.now();
    const slug = `${baseSlug}-${timestamp}`;

    // Formata data em português
    const date = new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    }).format(new Date(validated.publishedAt));

    const newsData = {
      ...validated,
      slug,
      date,
      bodyText: validated.description,
      cta: 'Saiba mais',
      url: `/noticias/${slug}`,
      createdBy: (session.user as any).id,
      updatedBy: (session.user as any).id,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await collection.insertOne(newsData as any);

    return NextResponse.json({
      id: result.insertedId.toString(),
      slug,
      message: 'Notícia criada com sucesso',
    });
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Dados inválidos', details: error.errors },
        { status: 400 }
      );
    }
    console.error('Erro ao criar notícia:', error);
    return NextResponse.json(
      { error: 'Erro ao criar notícia' },
      { status: 500 }
    );
  }
}

// PUT - Atualizar notícia (protegido)
export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });
    }

    const body = await request.json();
    const validated = updateNewsSchema.parse(body);

    const collection = await getNewsCollection();
    const { _id, ...updateData } = validated;

    // Regenera slug se título mudou
    if (updateData.title) {
      const baseSlug = updateData.title
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');

      const timestamp = Date.now();
      (updateData as any).slug = `${baseSlug}-${timestamp}`;
    }

    // Regenera data se publishedAt mudou
    if (updateData.publishedAt) {
      (updateData as any).date = new Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      }).format(new Date(updateData.publishedAt));
    }

    // Atualiza description para bodyText se description mudou
    if (updateData.description) {
      (updateData as any).bodyText = updateData.description;
    }

    (updateData as any).updatedBy = (session.user as any).id;
    (updateData as any).updatedAt = new Date();

    const result = await collection.updateOne(
      { _id: new ObjectId(_id) },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { error: 'Notícia não encontrada' },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: 'Notícia atualizada com sucesso' });
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Dados inválidos', details: error.errors },
        { status: 400 }
      );
    }
    console.error('Erro ao atualizar notícia:', error);
    return NextResponse.json(
      { error: 'Erro ao atualizar notícia' },
      { status: 500 }
    );
  }
}

// DELETE - Deletar notícia (hard delete - protegido)
export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });
    }

    const body = await request.json();
    const validated = deleteNewsSchema.parse(body);

    const collection = await getNewsCollection();

    // Busca a notícia para obter a imagem antes de deletar
    const newsItem = await collection.findOne({
      _id: new ObjectId(validated._id),
    });

    if (!newsItem) {
      return NextResponse.json(
        { error: 'Notícia não encontrada' },
        { status: 404 }
      );
    }

    // Hard delete: remove permanentemente do banco
    const result = await collection.deleteOne({
      _id: new ObjectId(validated._id),
    });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { error: 'Erro ao excluir notícia' },
        { status: 500 }
      );
    }

    // Tenta deletar a imagem associada (se existir e for do Vercel Blob)
    if (newsItem.imageSrc && newsItem.imageSrc.includes('blob.vercel-storage.com')) {
      try {
        const { deleteUploadedFile } = await import('@/lib/upload');
        await deleteUploadedFile(newsItem.imageSrc);
      } catch (uploadError) {
        // Não falha a operação se a imagem não puder ser deletada
        console.warn('Erro ao deletar imagem:', uploadError);
      }
    }

    return NextResponse.json({ message: 'Notícia excluída com sucesso' });
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Dados inválidos', details: error.errors },
        { status: 400 }
      );
    }
    console.error('Erro ao excluir notícia:', error);
    return NextResponse.json(
      { error: 'Erro ao excluir notícia' },
      { status: 500 }
    );
  }
}
