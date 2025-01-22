DeviseTokenAuth.setup do |config|

  config.change_headers_on_each_request = false
  config.token_lifespan = 5.weeks

  config.token_cost = Rails.env.test? ? 4 : 10

end
