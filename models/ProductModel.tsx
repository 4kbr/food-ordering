export type ProductApi = {
  _id: string;
  title: string;
  desc: string;
  img: string;
  prices: [number];
  extraOptions: [
    {
      _id: string;
      text: string;
      price: number;
    }
  ];
};
export type ProductChild = {
  _id: string;
  title: string;
  desc: string;
  img: string;
  price: number;
  quantity: number;
  extras: [ExtraOption];
};

export type ExtraOption = {
  _id: string;
  text: string;
  price: number;
};
