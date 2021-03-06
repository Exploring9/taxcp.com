Rails.application.routes.draw do
  
  # You can have the root of your site routed with "root"
  root 'home#index'
  # Introduction Page - The Tax Calculator is on this page
  get 'home/index'
  #get '/', to: 'home#index'
  
  # Static pages about the application
  get 'static_pages/about_us'
  get 'static_pages/data', :defaults => { :format => 'json' }
  get 'static_pages/terms_and_conditions'

  # Page to contact me
  get 'messages', to: 'messages#new'
  post 'messages', to: 'messages#create'
  
  #This is for the posts
  resources :posts, only: [:index, :new, :show, :create, :edit, :save_edit], param: :post_id
  post 'posts/:post_id/edit', to: 'posts#save_edit'
  resources :comments, only: [:create], param: :comment_id

  match '/home/send_Input_Data', to: 'home#send_Input_Data', :via => [:get, :post]
  
  match '/home/send_All_Info', to: 'home#send_All_Info', :via => [:get, :post]
  
  #Cathing an error: match '/data', to: 'home#data_test', :via => [:get, :post]
  match '/home/data', to: 'home#data', :via => [:get, :post]
  
  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".
  
  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end    
end