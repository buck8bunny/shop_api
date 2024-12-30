class AddDeviseTokenAuthColumnsToUsers < ActiveRecord::Migration[8.0]
  def change
    change_table :users, bulk: true do |t|
      ## Required
      t.string :provider, null: false, default: "email"
      t.string :uid, null: false, default: ""

      ## Tokens
      t.json :tokens

      ## Confirmable
      t.string   :confirmation_token
      t.datetime :confirmed_at
      t.datetime :confirmation_sent_at
      t.string   :unconfirmed_email # Only if using reconfirmable

      ## Recoverable
      t.boolean  :allow_password_change, default: false
    end

    # Обновить существующие записи перед добавлением индекса
    reversible do |dir|
      dir.up do
        User.reset_column_information
        User.find_each do |user|
          user.update_columns(uid: user.email) if user.uid.blank?
        end
      end
    end

    add_index :users, [:uid, :provider], unique: true
    add_index :users, :confirmation_token, unique: true
  end
end
