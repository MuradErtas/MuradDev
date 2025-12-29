'use client'

import { useRouter } from 'next/navigation'

export default function QuantiumPage() {
  const router = useRouter()
  const githubUrl = 'https://github.com/MuradErtas'

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex flex-col">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md z-50 border-b border-slate-200 dark:border-slate-700">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => router.push('/')}
              className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:opacity-80 transition-opacity"
            >
              MuradDev
            </button>
            <button
              onClick={() => router.push('/')}
              className="px-4 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              Back to Home
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex-1 flex flex-col max-w-7xl mx-auto w-full px-6 pt-24 pb-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Quantium Data Analytics
          </h1>
          <p className="text-center text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-6">
            A job simulation project focused on data processing, transformation, and visualization. 
            Transformed raw sales data into actionable insights through data cleaning, aggregation, and interactive dashboards.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold text-lg shadow-lg"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482C19.138 20.197 22 16.425 22 12.017 22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
              View on GitHub
            </a>
          </div>
        </div>

        {/* Embedded Dashboard */}
        {process.env.NEXT_PUBLIC_QUANTIUM_DASH_URL && (
          <div className="mb-8">
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-200 dark:border-slate-700">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-semibold text-slate-700 dark:text-slate-300">Interactive Dashboard</h2>
                <a
                  href={process.env.NEXT_PUBLIC_QUANTIUM_DASH_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors flex items-center gap-1"
                >
                  Open in new tab
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
              <div className="relative w-full" style={{ minHeight: '600px' }}>
                <iframe
                  src={process.env.NEXT_PUBLIC_QUANTIUM_DASH_URL}
                  className="w-full h-full border-0 rounded-lg"
                  style={{ minHeight: '600px', height: '100vh', maxHeight: '800px' }}
                  title="Quantium Sales Dashboard"
                  allow="fullscreen"
                />
              </div>
            </div>
          </div>
        )}

        {/* Project Overview */}
        <div className="mb-8">
          <div className="bg-white dark:bg-slate-800 rounded-xl p-8 shadow-lg border border-slate-200 dark:border-slate-700">
            <h2 className="text-2xl font-semibold mb-4 text-slate-700 dark:text-slate-300">Project Overview</h2>
            <div className="space-y-4 text-slate-600 dark:text-slate-400">
              <p className="leading-relaxed">
                This project was completed as part of a Quantium job simulation, where I was tasked with processing 
                and analyzing sales data. The workflow involved transforming raw daily sales data from multiple CSV files, 
                filtering for specific product sales (pink morsel), calculating total sales, and creating an interactive 
                dashboard for data visualization.
              </p>
              <div className="grid md:grid-cols-3 gap-4 mt-6">
                <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-4">
                  <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">Data Processing</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Cleaned and transformed raw sales data from multiple CSV files into a unified, structured dataset.
                  </p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-4">
                  <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">Data Transformation</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Filtered product data, calculated sales metrics, and formatted data for analysis and visualization.
                  </p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-4">
                  <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">Visualization</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Built an interactive Dash application with region filtering and real-time sales analytics.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Data Transformation Showcase */}
        <div className="mb-8">
          <div className="bg-white dark:bg-slate-800 rounded-xl p-8 shadow-lg border border-slate-200 dark:border-slate-700">
            <h2 className="text-2xl font-semibold mb-6 text-slate-700 dark:text-slate-300">Data Transformation</h2>
            
            {/* Before/After Comparison */}
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              {/* Before - Raw Data */}
              <div>
                <h3 className="text-lg font-semibold mb-3 text-red-600 dark:text-red-400">Raw Input Data</h3>
                <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-4 overflow-x-auto">
                  <div className="text-xs font-mono text-slate-700 dark:text-slate-300">
                    <div className="mb-2 text-slate-500 dark:text-slate-400">daily_sales_data_0.csv</div>
                    <div className="space-y-1">
                      <div className="flex gap-2">
                        <span className="text-slate-500">date</span>
                        <span className="text-slate-500">region</span>
                        <span className="text-slate-500">product</span>
                        <span className="text-slate-500">quantity</span>
                        <span className="text-slate-500">price</span>
                      </div>
                      <div className="flex gap-2">
                        <span>2021-01-01</span>
                        <span>north</span>
                        <span>pink morsel</span>
                        <span>3</span>
                        <span>$5.00</span>
                      </div>
                      <div className="flex gap-2">
                        <span>2021-01-01</span>
                        <span>south</span>
                        <span>blue morsel</span>
                        <span>2</span>
                        <span>$4.50</span>
                      </div>
                      <div className="text-slate-500 italic">... (multiple files, all products)</div>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
                  Multiple CSV files with mixed products, unformatted prices, and no sales calculations
                </p>
              </div>

              {/* After - Processed Data */}
              <div>
                <h3 className="text-lg font-semibold mb-3 text-green-600 dark:text-green-400">Processed Output Data</h3>
                <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-4 overflow-x-auto">
                  <div className="text-xs font-mono text-slate-700 dark:text-slate-300">
                    <div className="mb-2 text-slate-500 dark:text-slate-400">pink_morsel_sales.csv</div>
                    <div className="space-y-1">
                      <div className="flex gap-2">
                        <span className="text-slate-500">sales</span>
                        <span className="text-slate-500">date</span>
                        <span className="text-slate-500">region</span>
                      </div>
                      <div className="flex gap-2">
                        <span>$15.00</span>
                        <span>2021-01-01</span>
                        <span>north</span>
                      </div>
                      <div className="flex gap-2">
                        <span>$22.50</span>
                        <span>2021-01-01</span>
                        <span>south</span>
                      </div>
                      <div className="text-slate-500 italic">... (unified, filtered, calculated)</div>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
                  Single CSV file with only pink morsel sales, calculated totals, and formatted currency
                </p>
              </div>
            </div>

            {/* Transformation Steps */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-4 text-slate-800 dark:text-slate-200">Transformation Process</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 font-semibold text-sm">
                    1
                  </div>
                  <div className="flex-1">
                    <p className="text-slate-700 dark:text-slate-300 font-medium">Load & Filter</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Read three CSV files and filter for "pink morsel" product only</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 font-semibold text-sm">
                    2
                  </div>
                  <div className="flex-1">
                    <p className="text-slate-700 dark:text-slate-300 font-medium">Calculate Sales</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Multiply quantity × price for each row, remove $ sign, convert to float</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 font-semibold text-sm">
                    3
                  </div>
                  <div className="flex-1">
                    <p className="text-slate-700 dark:text-slate-300 font-medium">Format & Combine</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Format sales with $ and 2 decimals, concatenate all dataframes, keep only sales/date/region columns</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 font-semibold text-sm">
                    4
                  </div>
                  <div className="flex-1">
                    <p className="text-slate-700 dark:text-slate-300 font-medium">Export</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Save to pink_morsel_sales.csv for dashboard visualization</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Code Snippet */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-3 text-slate-800 dark:text-slate-200">Key Code from sales_conversion.py</h3>
              <div className="bg-slate-900 rounded-lg p-4 overflow-x-auto">
                <pre className="text-xs text-slate-300 font-mono">
                  <code>{`# Filter for pink morsel only
df0 = df0[df0['product'] == 'pink morsel']

# Calculate sales (remove $, convert to float, multiply)
df0['sales'] = df0['quantity'] * \\
    df0['price'].str.replace('$', '').astype(float)

# Keep only needed columns
df0 = df0[['sales', 'date', 'region']]

# Format sales with currency
df['sales'] = df['sales'].apply(
    lambda x: '$' + str(x) + '.00'
)

# Combine and save
df = pd.concat([df0, df1, df2])
df.to_csv('data/pink_morsel_sales.csv', index=False)`}</code>
                </pre>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Showcase */}
        <div className="mb-8">
          <div className="bg-white dark:bg-slate-800 rounded-xl p-8 shadow-lg border border-slate-200 dark:border-slate-700">
            <h2 className="text-2xl font-semibold mb-4 text-slate-700 dark:text-slate-300">Interactive Dashboard</h2>
            <div className="space-y-4 text-slate-600 dark:text-slate-400">
              <p className="leading-relaxed">
                The final deliverable was an interactive Dash application that visualizes the processed sales data. 
                The dashboard includes region-based filtering, dynamic charts, and summary statistics.
              </p>
              <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-6 mt-4">
                <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-3">Dashboard Features</h3>
                <ul className="list-disc list-inside space-y-2 text-sm">
                  <li>Region dropdown filter (All, North, South, East, West)</li>
                  <li>Interactive Plotly line chart showing sales over time</li>
                  <li>Real-time chart updates based on region selection</li>
                  <li>Summary statistics cards (Total Sales, Average Daily Sales, Maximum Daily Sales)</li>
                  <li>Custom CSS styling with gradient backgrounds</li>
                  <li>Responsive design for different screen sizes</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="mb-8">
          <div className="bg-white dark:bg-slate-800 rounded-xl p-8 shadow-lg border border-slate-200 dark:border-slate-700">
            <h2 className="text-3xl font-bold mb-6 text-slate-700 dark:text-slate-300">About This Project</h2>
            
            <div className="space-y-6 text-slate-600 dark:text-slate-400">
              <div>
                <h3 className="text-xl font-semibold mb-3 text-slate-800 dark:text-slate-200">Overview</h3>
                <p className="leading-relaxed">
                  This project demonstrates end-to-end data analytics capabilities, from raw data processing to 
                  interactive visualization. The task involved working with daily sales data across multiple files, 
                  filtering for "pink morsel" product sales, calculating total sales (price × quantity), and creating 
                  a comprehensive dashboard for data exploration. The project showcases skills in data cleaning, 
                  transformation, and visualization using Python's data science ecosystem.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 text-slate-800 dark:text-slate-200">Technologies Used</h3>
                <ul className="list-disc list-inside space-y-2 leading-relaxed">
                  <li><strong className="text-slate-800 dark:text-slate-200">Pandas:</strong> Data manipulation and processing library for cleaning and transforming CSV data</li>
                  <li><strong className="text-slate-800 dark:text-slate-200">Dash:</strong> Python framework for building interactive web-based data visualization applications</li>
                  <li><strong className="text-slate-800 dark:text-slate-200">Plotly:</strong> Interactive graphing library for creating dynamic charts and visualizations</li>
                  <li><strong className="text-slate-800 dark:text-slate-200">Python:</strong> Core programming language for data processing scripts and application development</li>
                  <li><strong className="text-slate-800 dark:text-slate-200">Pytest:</strong> Testing framework for validating application functionality and data processing logic</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 text-slate-800 dark:text-slate-200">Skills Developed</h3>
                <ul className="list-disc list-inside space-y-2 leading-relaxed">
                  <li>Data cleaning and preprocessing techniques for real-world datasets</li>
                  <li>Data transformation and aggregation using Pandas DataFrames</li>
                  <li>Building interactive dashboards with Dash and Plotly</li>
                  <li>Working with multiple CSV files and data concatenation</li>
                  <li>String manipulation and data type conversion (price formatting, date parsing)</li>
                  <li>Writing comprehensive test suites for data applications</li>
                  <li>Creating user-friendly data visualization interfaces</li>
                  <li>Region-based data filtering and dynamic chart updates</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 text-slate-800 dark:text-slate-200">Key Features</h3>
                <ul className="list-disc list-inside space-y-2 leading-relaxed">
                  <li>Data processing script that combines multiple CSV files into a unified dataset</li>
                  <li>Product filtering to extract specific product sales (pink morsel)</li>
                  <li>Sales calculation (price × quantity) with proper currency formatting</li>
                  <li>Interactive Dash dashboard with region-based filtering</li>
                  <li>Real-time chart updates based on user selections</li>
                  <li>Summary statistics display (total sales, average daily sales, maximum daily sales)</li>
                  <li>Comprehensive test suite ensuring application reliability</li>
                  <li>Custom CSS styling for professional dashboard appearance</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 text-slate-800 dark:text-slate-200">Project Workflow</h3>
                <ol className="list-decimal list-inside space-y-2 leading-relaxed">
                  <li><strong className="text-slate-800 dark:text-slate-200">Data Collection:</strong> Loaded daily sales data from three separate CSV files</li>
                  <li><strong className="text-slate-800 dark:text-slate-200">Data Filtering:</strong> Filtered data to include only "pink morsel" product sales</li>
                  <li><strong className="text-slate-800 dark:text-slate-200">Data Transformation:</strong> Calculated total sales by multiplying price and quantity, formatted currency values</li>
                  <li><strong className="text-slate-800 dark:text-slate-200">Data Aggregation:</strong> Combined all filtered data into a single CSV file (pink_morsel_sales.csv)</li>
                  <li><strong className="text-slate-800 dark:text-slate-200">Visualization:</strong> Built interactive Dash application with region filtering and sales charts</li>
                  <li><strong className="text-slate-800 dark:text-slate-200">Testing:</strong> Created comprehensive test suite to validate dashboard components and functionality</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-800/50">
        <div className="max-w-7xl mx-auto text-center text-slate-600 dark:text-slate-400">
          <p>© {new Date().getFullYear()} MuradDev. All rights reserved.</p>
          <a href="https://github.com/MuradErtas" className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors">GitHub</a> repository for this project.
        </div>
      </footer>
    </div>
  )
}
