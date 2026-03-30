import { createClientFromRequest } from 'npm:@base44/sdk@0.8.23';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    
    if (!user || user.role !== 'admin') {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Import airport data from Excel file
    const fileUrl = 'https://media.base44.com/files/public/69c97dcd1c1950fa88424690/34cdf0fb6_dutyboost_europe_full_dataset.xlsx';
    
    // List of countries (sheet names) in the Excel file
    const countries = [
      'Netherlands', 'Germany', 'France', 'Spain', 'Italy', 'Belgium', 'Sweden', 
      'Norway', 'Denmark', 'Finland', 'Poland', 'Austria', 'Portugal', 'Ireland', 
      'Greece', 'Czech Republic', 'Hungary', 'Romania', 'Bulgaria', 'Croatia', 
      'Slovakia', 'Slovenia', 'Estonia', 'Latvia', 'Lithuania', 'Luxembourg', 
      'Malta', 'Cyprus', 'United Kingdom', 'Switzerland'
    ];

    let totalImported = 0;

    // Import from each country sheet
    for (const country of countries) {
      try {
        const result = await base44.integrations.Core.ExtractDataFromUploadedFile({
          file_url: fileUrl,
          json_schema: {
            type: 'object',
            properties: {
              'Airport Name': { type: 'string' },
              'IATA': { type: 'string' },
              'City': { type: 'string' },
              'Type': { type: 'string' },
              'Priority': { type: 'string' }
            }
          }
        });

        if (result.status === 'success' && result.output && Array.isArray(result.output)) {
          const airports = result.output.map(airport => ({
            name: airport['Airport Name'],
            code: airport['IATA'],
            city: airport['City'],
            country: country
          }));

          if (airports.length > 0) {
            await base44.entities.Airport.bulkCreate(airports);
            totalImported += airports.length;
          }
        }
      } catch (error) {
        console.error(`Error importing airports from ${country}:`, error);
        // Continue with next country
      }
    }

    return Response.json({ 
      success: true, 
      message: `Successfully imported ${totalImported} airports across all European countries` 
    });
  } catch (error) {
    console.error('Import error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});