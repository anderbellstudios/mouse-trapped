class StaticController < ApplicationController
  layout :resolve_layout

  def play
    @level_codes = LevelportLocations.all cookies: cookies
  end

  def splash
    @levels = LevelCode.recent

    if @levels.count == 1
      @verb = "is"
      @noun = "level"
      @pronoun = "it"
    else
      @verb = "are"
      @noun = "levels"
      @pronoun = "them"
    end
  end

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
