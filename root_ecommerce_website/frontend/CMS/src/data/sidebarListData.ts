import sitemap from 'routes/sitemap';

// Filter top list data, excluding items meant for the bottom list or profile
export const topListData = sitemap.filter((item) => {
  const id = item.id;
  // Exclude Product, Brand, and Category along with other specific items
  if (
    id === 'template-pages' ||
    id === 'settings' ||
    id === 'account-settings' ||
    id === 'authentication' ||
    id === 'product' ||
    id === 'brand' ||
    id === 'category'
  ) {
    return null;
  }
  return item;
});


// Filter bottom list data, including items for dropdowns (Product, Brand, Category)
export const bottomListData = sitemap.filter((item) => {
  const id = item.id;
  if (id === 'product' || id === 'brand' || id === 'category') {
    // Example structure for dropdown items
    return {
      ...item,
      items: [
        { name: `Add ${id.charAt(0).toUpperCase() + id.slice(1)}`, path: `/add-${id}`, active: false },
        { name: `View ${id.charAt(0).toUpperCase() + id.slice(1)}s`, path: `/view-${id}s`, active: false },
      ],
    };
  }
  if (id === 'template-pages' || id === 'settings' || id === 'authentication') {
    return item;
  }
  return null;
});

// Profile list data remains unchanged
export const profileListData = sitemap.find((item) => item.id === 'account-settings');
