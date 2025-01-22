class ReactAppController < ApplicationController
  def index
    Rails.logger.debug "Rendering index.html for path #{request.path}"
    render file: Rails.root.join('public', 'index.html'), layout: false
  end
end
