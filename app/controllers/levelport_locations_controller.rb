class LevelportLocationsController < ApplicationController
  layout false

  def create
    @code = levelport_locations_params
    raise "code invalid" if @code.include?('-') or @code.empty?
    LevelportLocations.create code: @code, cookies: cookies
    @result = '200'
  end

  private
    # Never trust parameters from the scary internet, only allow the white list through.
    def levelport_locations_params
      params.require(:code)
    end
end
