class CreateSurveys < ActiveRecord::Migration
  def change
  	create_table :surveys do |t|
  		t.string :author_username, :title, :description
  		t.timestamps
  	end
  end
end
