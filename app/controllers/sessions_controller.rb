class SessionsController < DeviseTokenAuth::SessionsController
  before_action :sanitize_params, only: [:create]

  private

  def sanitize_params
    params.delete(:session) if params[:session]
    Rails.logger.info "Sanitized parameters: #{params.inspect}"
  end
end