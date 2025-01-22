require_relative "boot"

require "rails/all"

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module ShopApi
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 8.0

    # Please, add to the `ignore` list any other `lib` subdirectories that do
    # not contain `.rb` files, or that should not be reloaded or eager loaded.
    # Common ones are `templates`, `generators`, or `middleware`, for example.
    config.autoload_lib(ignore: %w[assets tasks])

    # Configuration for the application, engines, and railties goes here.
    #
    # These settings can be overridden in specific environments using the files
    # in config/environments, which are processed later.
    #
    # config.time_zone = "Central Time (US & Canada)"
    # config.eager_load_paths << Rails.root.join("extras")
    config.session_store :cookie_store, key: '_your_app_session'
    config.middleware.use ActionDispatch::Session::CookieStore


    # Only loads a smaller set of middleware suitable for API only apps.
    # Middleware like session, flash, cookies can be added back manually.
    # Skip views, helpers and assets when generating a new resource.
    config.api_only = false
    config.action_cable.mount_path = nil
    config.action_cable.url = nil
    config.action_cable.allowed_request_origins = []

    config.public_file_server.enabled = true

    config.middleware.insert_before 0, Rack::Cors do
      allow do
        origins 'https://shop-api-308l.onrender.com', 'http://localhost:3001', 'http://127.0.0.1:3000', 'http://localhost:3000', 'https://shop-api-indol-nu.vercel.app', 'http://0.0.0.0:3000'
        resource '*',
                headers: :any,
                methods: [:get, :post, :put, :patch, :delete, :options, :head],
                expose: ['access-token', 'expiry', 'token-type', 'uid', 'client'] 
      end
    end

  end
end
