
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const COINGECKO_API_URL = 'https://api.coingecko.com/api/v3';

// This function handles GET requests to /api/coin-data
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const ids = searchParams.get('ids');
  
  if (!ids) {
    return NextResponse.json({ error: 'Coin IDs are required' }, { status: 400 });
  }

  const coingeckoApiKey = process.env.COINGECKO_API_KEY;
  if (!coingeckoApiKey) {
    console.error('COINGECKO_API_KEY is not set in environment variables.');
    // Fallback to public API if key is missing, though this is not recommended for production
  }

  const headers: HeadersInit = {
    'accept': 'application/json',
  };
  
  if (coingeckoApiKey) {
    headers['x-cg-demo-api-key'] = coingeckoApiKey;
  }

  try {
    const response = await fetch(
      `${COINGECKO_API_URL}/coins/markets?vs_currency=usd&ids=${ids}&order=market_cap_desc&per_page=100&page=1&sparkline=true&price_change_percentage=24h`,
      { headers }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error('CoinGecko API Error:', errorData);
      return NextResponse.json({ error: `Failed to fetch data from CoinGecko: ${errorData.error || response.statusText}` }, { status: response.status });
    }

    const data = await response.json();
    
    // Fetch detailed descriptions separately
    const detailedDataPromises = data.map(async (coin: any) => {
        const detailResponse = await fetch(`${COINGECKO_API_URL}/coins/${coin.id}?localization=false&tickers=false&market_data=false&community_data=false&developer_data=false&sparkline=false`, { headers });
        if (!detailResponse.ok) {
            return { ...coin, description: { en: 'Description not available.' } };
        }
        const detailJson = await detailResponse.json();
        return { ...coin, description: detailJson.description || { en: 'Description not available.' } };
    });

    const combinedData = await Promise.all(detailedDataPromises);

    return NextResponse.json(combinedData);
  } catch (error: any) {
    console.error('Error fetching from CoinGecko:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
