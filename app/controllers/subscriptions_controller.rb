class SubscriptionsController < ApplicationController
  layout :resolve_layout

  # GET /subscriptions/new
  def new
    @subscription = Subscription.new
  end

  # POST /subscriptions
  # POST /subscriptions.json
  def create
    @subscription = Subscription.new(subscription_params)
    @result = @subscription.save ? "success" : "failure"
    render layout: false
  end

  # DELETE /subscriptions/1
  # DELETE /subscriptions/1.json
  def destroy
    return false # disable destroying
    @subscription.destroy
    respond_to do |format|
      format.html { redirect_to subscriptions_url, notice: 'Subscription was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Never trust parameters from the scary internet, only allow the white list through.
    def subscription_params
      params.require(:subscription).permit(:email)
    end

    def resolve_layout
      "info"
    end
end
