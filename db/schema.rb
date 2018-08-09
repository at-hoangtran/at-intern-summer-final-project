# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20180808101724) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "action_details", force: :cascade do |t|
    t.integer  "auction_id"
    t.integer  "user_id"
    t.integer  "bid"
    t.integer  "status",     default: 0
    t.datetime "created_at",             null: false
    t.datetime "updated_at",             null: false
    t.index ["auction_id"], name: "index_action_details_on_auction_id", using: :btree
    t.index ["user_id"], name: "index_action_details_on_user_id", using: :btree
  end

  create_table "auctions", force: :cascade do |t|
    t.integer  "product_id"
    t.integer  "status",     default: 0
    t.datetime "created_at",             null: false
    t.datetime "updated_at",             null: false
    t.index ["product_id"], name: "index_auctions_on_product_id", using: :btree
  end

  create_table "categories", force: :cascade do |t|
    t.string   "name"
    t.integer  "parent_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.datetime "deleted_at"
    t.index ["deleted_at"], name: "index_categories_on_deleted_at", using: :btree
  end

  create_table "orders", force: :cascade do |t|
    t.integer  "action_detail_id"
    t.string   "address"
    t.string   "phone"
    t.integer  "total_price"
    t.integer  "status"
    t.datetime "created_at",       null: false
    t.datetime "updated_at",       null: false
    t.index ["action_detail_id"], name: "index_orders_on_action_detail_id", using: :btree
  end

  create_table "products", force: :cascade do |t|
    t.string   "name"
    t.integer  "price"
    t.integer  "quantity"
    t.string   "description"
    t.string   "images",                   array: true
    t.integer  "category_id"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
    t.datetime "deleted_at"
    t.index ["category_id"], name: "index_products_on_category_id", using: :btree
    t.index ["deleted_at"], name: "index_products_on_deleted_at", using: :btree
  end

  create_table "timers", force: :cascade do |t|
    t.datetime "start_at"
    t.datetime "end_at"
    t.integer  "period"
    t.integer  "step"
    t.integer  "product_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer  "auction_id"
    t.index ["auction_id"], name: "index_timers_on_auction_id", using: :btree
    t.index ["product_id"], name: "index_timers_on_product_id", using: :btree
  end

  create_table "users", force: :cascade do |t|
    t.string   "name"
    t.string   "email"
    t.string   "password_digest"
    t.string   "remember_digest"
    t.string   "activation_digest"
    t.boolean  "activated"
    t.datetime "activated_at"
    t.integer  "role"
    t.string   "reset_digest"
    t.datetime "reset_send_at"
    t.string   "address"
    t.string   "phone"
    t.string   "avatar"
    t.datetime "created_at",        null: false
    t.datetime "updated_at",        null: false
    t.datetime "deleted_at"
    t.string   "provider"
    t.string   "uid"
    t.index ["deleted_at"], name: "index_users_on_deleted_at", using: :btree
    t.index ["email"], name: "index_users_on_email", unique: true, using: :btree
    t.index ["phone"], name: "index_users_on_phone", unique: true, using: :btree
  end

  add_foreign_key "action_details", "auctions"
  add_foreign_key "action_details", "users"
  add_foreign_key "auctions", "products"
  add_foreign_key "orders", "action_details"
  add_foreign_key "products", "categories"
  add_foreign_key "timers", "auctions"
  add_foreign_key "timers", "products"
end
