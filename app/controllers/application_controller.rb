class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  before_action :redirect_if_old

  protected

  def redirect_if_old
    if should_redirect?
      redirect_to "#{request.protocol}www.mousetrapped.co.uk#{request.fullpath}", :status => :moved_permanently
    end
  end

  def should_redirect?
    request.host != 'www.mousetrapped.co.uk' and request.host != 'localhost'
  end
end
