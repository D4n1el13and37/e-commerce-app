import { CategoryDraft } from '@commercetools/platform-sdk';
import getApiRoot from '../api';
import { projectKey } from '../clientConfig';

async function createCategory(
  key: string,
  name: { [key: string]: string },
  parentId?: string
) {
  const categoryDraft: CategoryDraft = {
    key,
    name,
    slug: { en: key },
    parent: parentId ? { typeId: 'category', id: parentId } : undefined,
  };

  const response = await getApiRoot()
    .withProjectKey({ projectKey })
    .categories()
    .post({ body: categoryDraft })
    .execute();
  return response.body.id;
}

export default async function createCategories() {
  // const plantsId = await createCategory('plants', {
  //   en: 'Plants',
  //   ru: 'Растения',
  // });

  // Основные категории
  // await createCategory(
  //   'indoor-trees',
  //   { en: 'Indoor Trees', ru: 'Комнатные деревья' },
  //   plantsId
  // );
  // await createCategory(
  //   'foliage-plants',
  //   { en: 'Foliage Plants', ru: 'Листовые растения' },
  //   plantsId
  // );
  // await createCategory(
  //   'succulents',
  //   { en: 'Succulents', ru: 'Суккуленты' },
  //   plantsId
  // );
  // await createCategory(
  //   'flowering-plants',
  //   { en: 'Flowering Plants', ru: 'Цветущие растения' },
  //   plantsId
  // );

  // Отдельные категории
  // await createCategory('easy-to-care', {
  //   en: 'Easy to Care',
  //   ru: 'Легкий уход',
  // });
  // await createCategory('air-purifying', {
  //   en: 'Air Purifying',
  //   ru: 'Очищающие воздух',
  // });
  // await createCategory('pet-friendly', {
  //   en: 'Pet Friendly',
  //   ru: 'Безопасные для животных',
  // });
  await createCategory('indoor-outdoor', {
    en: 'Indoor/Outdoor',
    ru: 'В помещении/На улице',
  });
}
