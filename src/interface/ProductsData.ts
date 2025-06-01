export interface ProductListData {
    data: {
        products: ProductData[];
        total: number;
        skip: number;
        limit: number;
    },
    status: number;
    statusText: string;
}

export interface ProductData {
    id: number;
    title: string;
    description: string;
    category: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    tags: string[];
    brand: string;
    weight: number;
    dimensions: {
        height: string;
        width: string;
        depth: string;
    };
    reviews: Review[];
    returnPolicy: string;
    minimunOrderQuantity: number;
    warrantyInformation: string;
    shippingInformation: string;
    availabilityStatus: string;
    thumbnail: string;
    images: string[];
}

interface Review {
    rating: number;
    comment: string;
    date: string;
    reviewerName: string;
    reviewerEmail: string;
}

export interface ICategoriesData{
    data: ICategoryProps[];
    status: number;
    statusText?: string;
    errorMsg?: string;
}

export interface ICategoryProps {
    slug: string;
    name: string;
    url: string;
}