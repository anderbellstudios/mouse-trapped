class SubscriptionsController < ApplicationController
  before_action :set_subscription, only: [:destroy]
  layout :resolve_layout

  # GET /subscriptions/new
  def new
    @subscription = Subscription.new
  end

  # POST /subscriptions
  # POST /subscriptions.json
  def create
    @subscription = Subscription.new(subscription_params)
    succeeded = @subscription.save 
    @result = succeeded ? "success" : "failure"
    if succeeded
      SubscriptionMailer.welcome_email( @subscription ).deliver_later
    end
    render layout: false
  end

  def destroy
    if params[:security_hash] == @subscription.security_hash then
      @subscription.destroy
    else
      head :forbidden
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_subscription
      @subscription = Subscription.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def subscription_params
      params.require(:subscription).permit(:email).merge( security_hash: SecureRandom.hex )
    end

    def resolve_layout
      "info"
    end
end
