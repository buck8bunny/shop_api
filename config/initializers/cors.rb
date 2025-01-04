
Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
  
    
    origins 'https://shop-api-indol-nu.vercel.app', 'http://localhost:3001', 'https://shop-api-308l.onrender.com', 'http://0.0.0.0:3000', 'http://127.0.0.1:3000'
    resource '*',
      credentials: true,
      headers: :any,
      expose: ['access-token', 'expiry', 'token-type', 'uid', 'client'],
      methods: [:get, :post, :put, :patch, :delete, :options, :head]
  end
end

