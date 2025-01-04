class SessionsController < DeviseTokenAuth::SessionsController
  before_action :sanitize_params, only: [:create]

  private

  def sanitize_params
    if params[:session]
      params[:email] = params[:session][:email]
      params[:password] = params[:session][:password]
      params.delete(:session)
    end
    Rails.logger.info "Sanitized parameters: #{params.inspect}"
  end
end
