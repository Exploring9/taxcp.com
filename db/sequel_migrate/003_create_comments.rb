Sequel.migration do
  up do
    create_table(:comments) do
      primary_key :comment_id
      String :name,                   :null=>false
      String :body, :text=>true,      :null=>false
      Time   :create,                 :null=>false
      Time   :update,                 :null=>false
      foreign_key :post_id, :posts
    end
    
  end
  
  down do
    drop_table(:comments)
  end
end