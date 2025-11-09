import { CollectionBody } from '../types';
import { NamedAPIResource } from '../models';
import { PAGE, PAGE_SIZE } from '../constants/collections';

interface FilterCollectionProps {
  body?: Partial<CollectionBody>;
  results: NamedAPIResource[];
}
export function filterCollection({ body, results }: FilterCollectionProps): NamedAPIResource[] {
  let res: NamedAPIResource[];

  const { page, pageSize, sortBy, sortDescending, filterBy } = validateBody(body);

  res = filterBy
    ? results.filter((r) => {
        const id = r.url.split('/')[6];
        return (isNaN(Number(filterBy)) && r.name.includes(filterBy)) || id === filterBy;
      })
    : results;

  if (sortBy) {
    if (sortBy === 'order') {
      res = res.sort((a, b) => {
        const orderA = Number(a.url.split('/')[6]);
        const orderB = Number(b.url.split('/')[6]);
        return sortDescending ? orderB - orderA : orderA - orderB;
      });
    }

    if (sortBy === 'name') {
      res = res.sort((a, b) => (sortDescending ? b.name.localeCompare(a.name) : a.name.localeCompare(b.name)));
    }
  }

  // get paginated results
  res = filterBy ? res : res.slice(page * pageSize, page * pageSize + pageSize);

  return res;
}

function validateBody(body?: Partial<CollectionBody>) {
  let page = PAGE;
  let pageSize = PAGE_SIZE;
  let sortBy;
  const sortDescending = Boolean(body?.sortDescending);
  const filterBy = body?.filterBy || '';

  if (body?.page) {
    page = !isNaN(body?.page) ? Number(body?.page) : PAGE;
  }

  if (body?.pageSize) {
    pageSize = !isNaN(body?.pageSize) ? Number(body?.pageSize) : PAGE_SIZE;
  }

  if (body?.sortBy === 'name' || body?.sortBy === 'order') {
    sortBy = body?.sortBy;
  }
  return {
    page,
    pageSize,
    sortBy,
    sortDescending,
    filterBy,
  };
}
