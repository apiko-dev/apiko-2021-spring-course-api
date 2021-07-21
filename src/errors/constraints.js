export default {
  EMAIL_NOT_VALID: 'email_regex',
  EMAIL_EMPTY: 'email_not_blank',
  EMAIL_TOO_LONG: 'email_too_long',

  EMAIL_ALREADY_USED: 'user_email_unique',

  PHONE_EMPTY: 'phone_not_blank',
  PHONE_TOO_LONG: 'phone_too_long',

  NOT_FOUND_PRODUCT_CATEGORY: 'product_category_fk',

  PRODUCT_ALREADY_FAVORITE: 'favorite_products_unique',
  NOT_FOUND_FAVORITE_PRODUCT: 'favorite_products_product_fk',
  NOT_FOUND_FAVORITE_PRODUCT_OWNER: 'favorite_products_owner_fk',

  NOT_FOUND_ORDER_OWNER: 'orders_owner_fk',
  NOT_FOUND_ORDER_ITEMS_ORDER: 'order_items_order_fk',
  NOT_FOUND_ORDER_ITEMS_PRODUCT: 'order_items_product_fk',
  NOT_FOUND_SHIPMENT_ORDER: 'shipment_order_fk',
};
