// Shared fetch helper for the Zelora API (backend). Set VITE_API_URL in .env to override this.
export const API_URL = (import.meta.env.VITE_API_URL || 'https://backend-jewellry.vercel.app/api').replace(/\/$/, '');

export async function getJson(path) {
  const response = await fetch(`${API_URL}${path}`);
  const data = await response.json().catch(() => ({}));
  if (!response.ok || data.success === false) {
    throw new Error(data.message || `Request failed (${response.status})`);
  }
  return data;
}

async function sendJson(method, path, body) {
  const response = await fetch(`${API_URL}${path}`, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok || data.success === false) {
    throw new Error(data.message || `Request failed (${response.status})`);
  }
  return data;
}

export const postJson = (path, body) => sendJson('POST', path, body);
export const patchJson = (path, body) => sendJson('PATCH', path, body);

export async function deleteJson(path) {
  const response = await fetch(`${API_URL}${path}`, { method: 'DELETE' });
  const data = await response.json().catch(() => ({}));
  if (!response.ok || data.success === false) {
    throw new Error(data.message || `Request failed (${response.status})`);
  }
  return data;
}

// For multipart/form-data requests (product create/update, which upload images).
// No Content-Type header is set here on purpose - the browser adds the multipart
// boundary itself when the body is a FormData instance.
async function sendForm(method, path, formData) {
  const response = await fetch(`${API_URL}${path}`, { method, body: formData });
  const data = await response.json().catch(() => ({}));
  if (!response.ok || data.success === false) {
    throw new Error(data.message || `Request failed (${response.status})`);
  }
  return data;
}

// Drops undefined/empty values so they don't end up as "?page=&limit=" in the URL
function toQuery(params = {}) {
  const query = new URLSearchParams(
    Object.entries(params).filter(([, value]) => value !== undefined && value !== null && value !== '')
  ).toString();
  return query ? `?${query}` : '';
}

// --- Orders (see backend: routes/orderRoutes.js, controllers/orderController.js) ---

// POST /api/orders  { customer, shippingAddress, items: [{ productId, size, quantity }], paymentMethod, notes }
export const createOrder = (order) => postJson('/orders', order);

// GET /api/orders?status=&paymentStatus=&paymentMethod=&search=&from=&to=&sort=&page=&limit=
export function getOrders(params = {}) {
  const query = new URLSearchParams(
    Object.entries(params).filter(([, value]) => value !== undefined && value !== '')
  ).toString();
  return getJson(`/orders${query ? `?${query}` : ''}`);
}

// GET /api/orders/options
export const getOrderOptions = () => getJson('/orders/options');

// GET /api/orders/track?orderNumber=ZLR-100001&email=customer@example.com
export function trackOrder(orderNumber, email) {
  const query = new URLSearchParams({ orderNumber, email }).toString();
  return getJson(`/orders/track?${query}`);
}

// GET /api/orders/:idOrNumber
export const getOrder = (idOrNumber) => getJson(`/orders/${encodeURIComponent(idOrNumber)}`);

// PATCH /api/orders/:id/status  { status, paymentStatus, note }
export const updateOrderStatus = (id, update) => patchJson(`/orders/${id}/status`, update);

// --- Products (see backend: routes/productRoutes.js, controllers/productController.js) ---

// GET /api/products?category=&collection=&newArrival=&minPrice=&maxPrice=&size=&search=&sort=&page=&limit=
export const getProducts = (params = {}) => getJson(`/products${toQuery(params)}`);

// GET /api/products/search?q=&category=&collection=&minPrice=&maxPrice=&size=&newArrival=&sort=&page=&limit=
export const searchProducts = (params = {}) => getJson(`/products/search${toQuery(params)}`);

// GET /api/products/search/suggestions?q=&limit=
export const getSearchSuggestions = (q, limit) => getJson(`/products/search/suggestions${toQuery({ q, limit })}`);

// GET /api/products/menu  -> navbar items (label + slug)
export const getProductMenu = () => getJson('/products/menu');

// GET /api/products/menu/:menuSlug?...  -> products for one navbar item, e.g. "rings", "new-arrivals"
export const getProductsByMenu = (menuSlug, params = {}) =>
  getJson(`/products/menu/${encodeURIComponent(menuSlug)}${toQuery(params)}`);

// GET /api/products/options  -> { categories, collections, sorts }
export const getProductOptions = () => getJson('/products/options');

// GET /api/products/sku/:sku
export const getProductBySku = (sku) => getJson(`/products/sku/${encodeURIComponent(sku)}`);

// GET /api/products/:idOrSlug
export const getProduct = (idOrSlug) => getJson(`/products/${encodeURIComponent(idOrSlug)}`);

// POST /api/products  (FormData: editable fields + image files under "images")
export const createProduct = (formData) => sendForm('POST', '/products', formData);

// PATCH /api/products/:id  (FormData: changed fields, new files under "images", removeImages=["publicId"])
export const updateProduct = (id, formData) => sendForm('PATCH', `/products/${id}`, formData);

// DELETE /api/products/:id
export const deleteProduct = (id) => deleteJson(`/products/${id}`);
