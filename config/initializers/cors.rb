Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do 
    origins 'https://shop-api-indol-nu.vercel.app', 'http://localhost:3001', 'https://shop-api-308l.onrender.com', 'http://0.0.0.0:3000', 'http://127.0.0.1:3000'
    resource '*',
          methods: [:get, :post, :put, :delete, :options, :head],
      headers: :any,
      expose: ['access-token', 'expiry', 'token-type', 'uid', 'client', 'Access-Token', 'Authorization', 'Client', 'Uid'],
      credentials: true 
  end
end

