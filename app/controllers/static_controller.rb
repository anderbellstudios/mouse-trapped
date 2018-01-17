class StaticController < ApplicationController
  layout :resolve_layout

  private

  def resolve_layout
    case action_name
    when "splash", "play"
      "interactive"
    else
      "info"
    end
  end
end
