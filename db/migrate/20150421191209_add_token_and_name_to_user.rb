class AddTokenAndNameToUser < ActiveRecord::Migration
  def change
    add_column :users, :fb_token, :text
    add_column :users, :name, :string
  end
end
