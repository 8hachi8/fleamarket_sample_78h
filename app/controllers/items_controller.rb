class ItemsController < ApplicationController
  before_action :set_category
  before_action :set_item, only: [:edit, :update]
  
  def index
  end

  def new
    @item = Item.new
    @item.build_brand
    @item.item_images.build
  end
  
  def create
    @item = Item.new(item_params)
    if @item.save
      redirect_to user_path
    else
      flash.now[:alert] = '必須項目の内容を確認してください。'
      render :new
    end
  end

  def show
  end
  
  def edit
  end

  def update
    if @item.update(item_params)
      redirect_to user_path
    else
    flash.now[:alert] = '必須項目の内容を確認してください。'
    render 'edit'
    end
  end

  

  private
  def set_category
    @parents = Category.where(ancestry: nil).order("id ASC")
  end

  def set_item
    @item = Item.find(params[:id])
  end

  def item_params
    params.require(:item).permit(:name, :introduction, :price, [brand_attributes: [:id, :name]], :category_id, :item_condition, :delivery_burden, :delivery_method, :shipper, :shipping_day, :size, {item_images_attributes: [:image, :_destroy, :id]}).merge(seller_id: current_user.id)
  end
end
