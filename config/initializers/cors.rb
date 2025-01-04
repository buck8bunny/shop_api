
Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins 'https://shop-s2wc.onrender.com', 'http://localhost:3001', 'http://127.0.0.1:3001'
    
    resource '*',
      credentials: true,
      headers: :any,
      expose: ['access-token', 'expiry', 'token-type', 'uid', 'client'],
      methods: [:get, :post, :put, :patch, :delete, :options, :head]
  end
end

