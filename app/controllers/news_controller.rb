class NewsController < ApplicationController
  layout :resolve_layout

  # GET /news
  # GET /news.json
  def index
    @news = News.order(:created_at)
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_news
      @news = News.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def news_params
      params.require(:news).permit(:title, :body)
    end

    def resolve_layout
      "info"
    end

end
