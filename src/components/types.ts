export interface IScreenWrapperProps{
    children: React.ReactNode;
}


export type ISortOption = 'price-low-high' | 'price-high-low' | 'a-z' | 'z-a';

export type ItemsPerPageOption = 5 | 10 | 20 | 30;

export interface FilterState {
  itemsPerPage: ItemsPerPageOption;
  sort: ISortOption | null;
  category: string;
}