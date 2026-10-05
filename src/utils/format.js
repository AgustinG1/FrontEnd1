const currency = new Intl.NumberFormat('es-CL', {
  style: 'currency', currency: 'CLP', maximumFractionDigits: 0,
});

export const formatPrice = (value) => currency.format(value);
export const assetUrl = (path) => `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`;
export const normalizeText = (value) => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
