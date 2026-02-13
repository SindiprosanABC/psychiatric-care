import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { getNewsCollection } from '@/lib/mongodb';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });
    }

    const collection = await getNewsCollection();

    const total = await collection.countDocuments({});
    const active = await collection.countDocuments({ isActive: true });

    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const thisMonth = await collection.countDocuments({
      createdAt: { $gte: startOfMonth },
    });

    return NextResponse.json({
      total,
      active,
      thisMonth,
    });
  } catch (error) {
    console.error('Erro ao buscar estatísticas:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar estatísticas' },
      { status: 500 }
    );
  }
}
