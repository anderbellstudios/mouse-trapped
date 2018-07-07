Rails.application.routes.draw do
  root 'static#splash'
  get 'play', to: 'static#play'
  get 'about', to: 'static#about'
  get 'instructions', to: 'static#instructions'
  get 'contact', to: 'static#contact'
  get 'notifyme', to: 'subscriptions#new'
  get 'privacy', to: 'static#privacy'
  get 'gameover', to: 'static#gameover'
  get 'unsubscribe/:id', to: 'subscriptions#destroy'
  get 'level_code/:id', to: 'level_codes#show'
  resource :subscriptions
  get 'news', to: 'news#index'
  get 'levelport_locations/create'
end
