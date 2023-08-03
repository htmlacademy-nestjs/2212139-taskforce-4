import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function fillDb() {
  await prisma.task.upsert(
    {
      where: { taskId: 1 },
      update: {},
      create: {
        title: 'Собрать шкаф',
        details: 'Шкаф новый. Инструкция имеется',
        price: 300,
        address: 'ул. Мебельная д. 21 кв. 10',
        city: 'Санкт-Петербург',
        customerId: '22',
        executerId: '115',
        status: 'new',
        category: {
          create: {
            name: 'мебель',
          },
        },
        comments: {
          create: [
            {
              message: 'На первый взгляд - легкая работа',
              userId: '21',
            },
            {
              message: 'Не страшней других.',
              userId: '117',
            },
          ],
        },
        tags: {
          create: [
            {
              name: 'мебель',
            },
            {
              name: 'сборка',
            },
            {
              name: 'быстро',
            },
          ],
        },
        review: {
          create: {
            review: 'Очень даже good!',
            evaluation: 4,
          },
        },
      },
    },
    {
      where: { taskId: 2 },
      update: {},
      create: {
        title: 'Установить фильтр для воды',
        details: 'Фильтр осмос Prestige-3M',
        price: 200,
        address: 'ул. Гагарина д. 11 кв. 42',
        city: 'Москва',
        customerId: '12',
        executerId: '15',
        status: 'new',
        category: {
          create: {
            name: 'фильтр',
          },
        },
        comments: {
          create: [
            {
              message: 'Работа на 30 минут.',
              userId: '28',
            },
            {
              message: 'Жаль я очень занят...',
              userId: '17',
            },
          ],
        },
        tags: {
          create: [
            {
              name: 'фильтр',
            },
            {
              name: 'вода',
            },
            {
              name: 'быстро',
            },
          ],
        },
        review: {
          create: {
            review: 'Очень даже good!',
            evaluation: 4,
          },
        },
      },
    }
  );

  console.info('🤘️ Database was filled');
}

fillDb()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (err) => {
    console.error(err);
    await prisma.$disconnect();

    process.exit(1);
  });
