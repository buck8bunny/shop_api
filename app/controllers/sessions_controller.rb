class SessionsController < DeviseTokenAuth::SessionsController
  before_action :sanitize_params, only: [:create]

  private

  def sanitize_params
    params.delete(:session) if params[:session]
    Rails.logger.info "Sanitized parameters: #{params.inspect}"
  end

  def create
    super
    # добавить заголовки вручную (если необходимо)
    response.set_header('access-token', @token.token)
    response.set_header('client', @client)
    response.set_header('uid', @resource.uid)
  end
end