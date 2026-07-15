/**
 * formatPrice - Utility function to format prices consistently
 * 
 * This function centralizes price formatting logic following DRY principle.
 * Uses Intl.NumberFormat for proper internationalization support.
 * 
 * @param price - The price to format
 * @param currency - The currency code (default: 'USD')
 * @param locale - The locale for formatting (default: 'en-US')
 * @returns Formatted price string
 * 
 * @example
 * formatPrice(99.99) // Returns "$99.99"
 * formatPrice(1234.56, 'EUR', 'de-DE') // Returns "1.234,56 €"
 */
export const formatPrice = (price: number, currency: string = 'USD', locale: string = 'en-US'): string => {
    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency,
    }).format(price);
};
