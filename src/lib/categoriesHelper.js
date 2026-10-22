import { useState, useEffect } from 'react';
import { CATALOG } from '@/data/catalog.mjs';

export const DEFAULT_CATEGORIES = CATALOG.map((cat) => ({
  id: cat.slug,
  name: cat.name,
  slug: cat.slug,
  subcategories: cat.subcategories.map((sub) => ({ id: sub.slug, name: sub.name, slug: sub.slug })),
}));

export function formatCategories(rawCategories) {
  if (!rawCategories || !Array.isArray(rawCategories) || rawCategories.length === 0) {
    return DEFAULT_CATEGORIES;
  }

  // Filter top-level parent categories
  const parents = rawCategories.filter((c) => !c.parentCategory);
  if (parents.length === 0) return DEFAULT_CATEGORIES;

  return parents.map((parent) => {
    const parentId = (parent._id || parent.id || '').toString();
    const parentSlug = parent.slug;

    const subcategories = rawCategories
      .filter((c) => {
        if (!c.parentCategory) return false;
        const cParentId = (
          typeof c.parentCategory === 'object'
            ? c.parentCategory._id || c.parentCategory.id || ''
            : c.parentCategory || ''
        ).toString();
        const cParentSlug =
          typeof c.parentCategory === 'object' ? c.parentCategory.slug : null;

        return (
          (parentId && cParentId === parentId) ||
          (parentSlug && cParentSlug === parentSlug) ||
          (parentSlug && cParentId === parentSlug)
        );
      })
      .map((sub) => ({
        id: sub._id || sub.slug,
        name: sub.name,
        slug: sub.slug,
      }));

    return {
      id: parent._id || parent.slug,
      name: parent.name,
      slug: parent.slug,
      subcategories,
    };
  });
}

export function useCategories() {
  const [categories, setCategories] = useState(DEFAULT_CATEGORIES);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    async function fetchCategories() {
      try {
        const res = await fetch('/api/categories');
        if (res.ok) {
          const data = await res.json();
          if (data.success && Array.isArray(data.categories) && data.categories.length > 0) {
            const formatted = formatCategories(data.categories);
            if (isMounted) {
              setCategories(formatted);
            }
          }
        }
      } catch (err) {
        console.error('Failed to load categories:', err);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }
    fetchCategories();
    return () => {
      isMounted = false;
    };
  }, []);

  return { categories, loading };
}
