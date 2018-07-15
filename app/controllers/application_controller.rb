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
    not %w{localhost www.mousetrapped.co.uk}.include?(request.host)
  end
end
