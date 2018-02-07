Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'static#splash'
  get 'play', to: 'static#play'
  get 'about', to: 'static#about'
  get 'instructions', to: 'static#instructions'
  get 'contact', to: 'static#contact'
  get 'notifyme', to: 'subscriptions#new'
  get 'unsubscribe/:id', to: 'subscriptions#destroy'
  get 'level_code/:id', to: 'level_codes#show'
  resource :subscriptions
end
