export class Item {
    _id: { $oid: string };
    name: string;
    image_url: string;
    quote: string;
    rarity: string;
    category: Array<string>;
    weight: any;
    required_level: number;
    crafting_time: string;
    crafted_in: Array<string>;
    ingredients: Array<Object>;
    user_inventory: Array<any>;
  }