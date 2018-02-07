class LevelCodesController < ApplicationController
  def show
    level_code = LevelCode.find_level_for(params[:id]) || Struct.new(:level).new('invalid')
    @level_id = level_code.level
    render :layout => false
  end
end
