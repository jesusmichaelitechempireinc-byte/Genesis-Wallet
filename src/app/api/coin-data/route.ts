
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
    const marketResponse = await fetch(
      `${COINGECKO_API_URL}/coins/markets?vs_currency=usd&ids=${ids}&order=market_cap_desc&per_page=100&page=1&sparkline=true&price_change_percentage=24h`,
      { headers }
    );

    if (!marketResponse.ok) {
      const errorData = await marketResponse.json();
      console.error('CoinGecko API Error (Markets):', errorData);
      return NextResponse.json({ error: `Failed to fetch market data from CoinGecko: ${errorData.error || marketResponse.statusText}` }, { status: marketResponse.status });
    }

    const marketData = await marketResponse.json();

    return NextResponse.json(marketData);
  } catch (error: any) {
    console.error('Error fetching from CoinGecko:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
