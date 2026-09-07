"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { 
  Search, 
  ShoppingCart, 
  ShieldCheck, 
  MapPin, 
  Sparkles, 
  PlusCircle, 
  Tag, 
  Info,
  CheckCircle2,
  Package,
  Layers
} from 'lucide-react';
import { Cart, CartItem } from '@/components/ui/cart';
import { Checkout } from '@/components/ui/checkout';
import { Orders, Order } from '@/components/ui/orders';
import { getOrdersByUser } from '@/lib/services/order.service';
import { useAuth } from '@/components/auth-provider';

// Initial sample product data
const INITIAL_PRODUCTS = [
  {
    id: '1',
    name: 'Fresh Organic Heirloom Tomatoes',
    price: 2.99,
    unit: 'per kg',
    seller: 'Green Valley Farms',
    sellerId: 'gvf123',
    location: 'Springfield, IL',
    image: 'https://images.pexels.com/photos/5529599/pexels-photo-5529599.jpeg',
    category: 'vegetables',
    stock: 250,
    organic: true,
    harvestDate: '3 days ago',
    moisture: '91%',
    certification: 'USDA Organic Certified #88219'
  },
  {
    id: '2',
    name: 'Long-Grain Aromatic Basmati (25kg Bag)',
    price: 42.50,
    unit: '25kg sack',
    seller: 'Golden Harvest Co.',
    sellerId: 'ghc456',
    location: 'Sacramento, CA',
    image: 'https://images.pexels.com/photos/4110251/pexels-photo-4110251.jpeg',
    category: 'grains',
    stock: 80,
    organic: true,
    harvestDate: 'Oct 2024',
    moisture: '12.4%',
    certification: 'Non-GMO Verified Batch #09-B'
  },
  {
    id: '3',
    name: 'Crisp Honeycrisp & Gala Apple Crate',
    price: 15.99,
    unit: '5kg crate',
    seller: 'Hillside Orchards',
    sellerId: 'ho789',
    location: 'Eugene, OR',
    image: 'https://images.pexels.com/photos/1510392/pexels-photo-1510392.jpeg',
    category: 'fruits',
    stock: 45,
    organic: true,
    harvestDate: 'Yesterday',
    moisture: '84%',
    certification: 'GlobalGAP Farm Verified'
  },
  {
    id: '4',
    name: 'Heavy-Duty Handheld Ergonomic Tiller',
    price: 29.99,
    unit: 'unit',
    seller: 'AgriTools Machinery',
    sellerId: 'ats101',
    location: 'Columbus, OH',
    image: 'https://images.pexels.com/photos/369267/pexels-photo-369267.jpeg',
    category: 'tools',
    stock: 20,
    organic: false,
    harvestDate: 'N/A',
    moisture: 'N/A',
    certification: 'Lifetime Steel Guarantee'
  },
  {
    id: '5',
    name: 'Bio-Active Worm Castings & Compost (10kg)',
    price: 18.75,
    unit: '10kg sack',
    seller: 'Natural Growth Inc.',
    sellerId: 'ngi202',
    location: 'Portland, OR',
    image: 'https://images.pexels.com/photos/2749165/pexels-photo-2749165.jpeg',
    category: 'supplies',
    stock: 140,
    organic: true,
    harvestDate: 'Current Batch',
    moisture: '22%',
    certification: 'OMRI Listed for Organic Use'
  },
  {
    id: '6',
    name: 'Wildflower Raw Comb Honey (1L Jar)',
    price: 22.50,
    unit: '1L jar',
    seller: 'Sunny Apiaries Cooperative',
    sellerId: 'sa303',
    location: 'Austin, TX',
    image: 'https://images.pexels.com/photos/1027810/pexels-photo-1027810.jpeg',
    category: 'specialty',
    stock: 65,
    organic: true,
    harvestDate: 'Last Week',
    moisture: '17.2%',
    certification: '100% Unpasteurized Raw Honey'
  }
];

export default function MarketplaceClient() {
  const { toast } = useToast();
  const { user } = useAuth();
  const [productList, setProductList] = useState(INITIAL_PRODUCTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(false);

  // Modals
  const [selectedProduct, setSelectedProduct] = useState<typeof INITIAL_PRODUCTS[0] | null>(null);
  const [isListLotModalOpen, setIsListLotModalOpen] = useState(false);

  // New listing form state
  const [newLot, setNewLot] = useState({
    name: '',
    category: 'vegetables',
    price: '',
    unit: 'per kg',
    stock: '50',
    location: '',
    certification: 'Certified Farm Standard'
  });

  useEffect(() => {
    if (user?.id) {
      setOrdersLoading(true);
      getOrdersByUser(user.id)
        .then((data) => setOrders(data || []))
        .finally(() => setOrdersLoading(false));
    }
  }, [user?.id]);
  
  const filteredProducts = productList.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        product.seller.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        product.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });
  
  const handleAddToCart = (productId: string) => {
    const product = productList.find(p => p.id === productId);
    if (!product) return;

    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === productId);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, {
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
        image: product.image,
        sellerId: product.sellerId,
      }];
    });

    toast({
      title: 'Added to cart',
      description: `${product.name} added to your order basket.`,
    });
  };

  const handleRemoveFromCart = (productId: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId
          ? { ...item, quantity }
          : item
      )
    );
  };

  const handleCheckout = () => {
    setIsCheckoutOpen(true);
  };

  const handlePaymentComplete = () => {
    setCartItems([]);
    setIsCheckoutOpen(false);
    toast({
      title: 'Escrow Payment Secured',
      description: 'Your purchase order has been placed and funds are held in AgroByte Escrow until dispatch confirmation.',
    });
  };

  const handleCreateLot = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLot.name || !newLot.price) {
      toast({
        title: 'Missing Fields',
        description: 'Please specify the lot name and price.',
        variant: 'destructive',
      });
      return;
    }

    const created: typeof INITIAL_PRODUCTS[0] = {
      id: Date.now().toString(),
      name: newLot.name,
      price: parseFloat(newLot.price) || 10,
      unit: newLot.unit,
      seller: user?.name || 'Local Farm Producer',
      sellerId: user?.id || 'producer_1',
      location: newLot.location || 'Local Regional Hub',
      image: 'https://images.pexels.com/photos/2284170/pexels-photo-2284170.jpeg',
      category: newLot.category,
      stock: parseInt(newLot.stock, 10) || 50,
      organic: true,
      harvestDate: 'Today',
      moisture: 'Optimal',
      certification: newLot.certification
    };

    setProductList([created, ...productList]);
    setIsListLotModalOpen(false);
    setNewLot({
      name: '',
      category: 'vegetables',
      price: '',
      unit: 'per kg',
      stock: '50',
      location: '',
      certification: 'Certified Farm Standard'
    });

    toast({
      title: 'Lot Listed Successfully',
      description: 'Your farm lot is now published and visible to certified buyers on AgroByte.',
    });
  };
  
  return (
    <main className="flex-1 px-4 sm:px-8 py-8 max-w-7xl mx-auto w-full space-y-8">
      
      {/* Top Escrow & Fair Trade Banner */}
      <div className="rounded-2xl border bg-card p-6 sm:p-7 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xs">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>Zero Broker Middlemen · 100% Escrow Protected</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
            Agricultural Wholesale & Produce Exchange
          </h1>
          <p className="text-sm text-muted-foreground max-w-2xl leading-relaxed">
            Trade directly with certified independent growers and cooperatives. Payouts are protected in automated smart escrow until physical inspection upon arrival.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <Cart
            items={cartItems}
            onRemoveItem={handleRemoveFromCart}
            onUpdateQuantity={handleUpdateQuantity}
            onCheckout={handleCheckout}
          />
          <Orders orders={orders} loading={ordersLoading} />
          <Button 
            onClick={() => setIsListLotModalOpen(true)}
            className="rounded-xl shadow-xs gap-1.5 font-semibold"
          >
            <PlusCircle className="h-4 w-4" />
            <span>List Farm Lot</span>
          </Button>
        </div>
      </div>

      {/* Search & Filter Controls */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search crop varieties, farm names, or regions..."
            className="pl-10 rounded-xl bg-card border text-sm focus-visible:ring-primary h-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-full sm:w-[200px] rounded-xl bg-card h-10 text-sm">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="all">All Produce & Supplies</SelectItem>
            <SelectItem value="vegetables">Fresh Vegetables</SelectItem>
            <SelectItem value="fruits">Fresh Fruits</SelectItem>
            <SelectItem value="grains">Grains & Cereals</SelectItem>
            <SelectItem value="supplies">Soil & Bio-Nutrients</SelectItem>
            <SelectItem value="tools">Precision Farm Tools</SelectItem>
            <SelectItem value="specialty">Artisanal & Specialty</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
        <div className="rounded-2xl border bg-card/60 p-12 text-center space-y-4">
          <Package className="h-10 w-10 text-muted-foreground mx-auto" />
          <div>
            <h3 className="text-lg font-bold text-foreground">No Matching Produce Lots</h3>
            <p className="text-sm text-muted-foreground mt-1">Try relaxing your search terms or selecting another category.</p>
          </div>
          <Button variant="outline" className="rounded-xl" onClick={() => {
            setSearchQuery('');
            setCategoryFilter('all');
          }}>
            Reset Filters
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="overflow-hidden rounded-2xl border bg-card flex flex-col justify-between shadow-xs card-hover">
              <div>
                <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-300 hover:scale-105"
                  />
                  {product.organic && (
                    <span className="absolute top-3 left-3 text-[11px] font-semibold px-2.5 py-1 rounded-full bg-emerald-600 text-white shadow-xs">
                      Organic Verified
                    </span>
                  )}
                  <span className="absolute bottom-3 right-3 text-xs font-mono font-bold px-2 py-0.5 rounded-lg bg-black/70 text-white backdrop-blur-xs">
                    Stock: {product.stock} {product.unit}
                  </span>
                </div>

                <CardContent className="p-5 space-y-3">
                  <div>
                    <h3 className="text-base font-bold text-foreground line-clamp-1">{product.name}</h3>
                    <div className="flex items-baseline gap-1.5 mt-1">
                      <span className="text-xl font-extrabold text-primary">${product.price.toFixed(2)}</span>
                      <span className="text-xs text-muted-foreground">{product.unit}</span>
                    </div>
                  </div>

                  <div className="pt-2 border-t space-y-1.5 text-xs text-muted-foreground">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-foreground">{product.seller}</span>
                      <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold">0% Middleman</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                      <span>{product.location}</span>
                    </div>
                  </div>
                </CardContent>
              </div>

              <CardFooter className="p-5 pt-0 flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="rounded-xl text-xs flex-1" 
                  onClick={() => setSelectedProduct(product)}
                >
                  <Info className="h-3.5 w-3.5 mr-1" />
                  <span>Details</span>
                </Button>
                <Button 
                  size="sm" 
                  className="rounded-xl text-xs flex-1 font-semibold" 
                  onClick={() => handleAddToCart(product.id)}
                >
                  <ShoppingCart className="h-3.5 w-3.5 mr-1" />
                  <span>Add to Order</span>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {/* Lot Details Modal */}
      {selectedProduct && (
        <Dialog open={!!selectedProduct} onOpenChange={() => setSelectedProduct(null)}>
          <DialogContent className="rounded-2xl sm:max-w-lg">
            <DialogHeader>
              <div className="flex items-center gap-2 text-primary text-xs font-semibold">
                <ShieldCheck className="h-4 w-4" />
                <span>AgroByte Verified Lot Specification</span>
              </div>
              <DialogTitle className="text-xl font-extrabold text-foreground">
                {selectedProduct.name}
              </DialogTitle>
              <DialogDescription>
                Direct harvest from {selectedProduct.seller} in {selectedProduct.location}.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-2 text-sm">
              <div className="relative aspect-video rounded-xl overflow-hidden border">
                <Image
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-muted/40 border">
                  <span className="text-muted-foreground">Unit Price</span>
                  <p className="text-sm font-bold text-primary mt-0.5">
                    ${selectedProduct.price.toFixed(2)} {selectedProduct.unit}
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-muted/40 border">
                  <span className="text-muted-foreground">Available Quantity</span>
                  <p className="text-sm font-bold text-foreground mt-0.5">
                    {selectedProduct.stock} {selectedProduct.unit}
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-muted/40 border">
                  <span className="text-muted-foreground">Harvest Timestamp</span>
                  <p className="text-xs font-bold text-foreground mt-0.5">{selectedProduct.harvestDate}</p>
                </div>
                <div className="p-3 rounded-xl bg-muted/40 border">
                  <span className="text-muted-foreground">Moisture Content</span>
                  <p className="text-xs font-bold text-foreground mt-0.5">{selectedProduct.moisture}</p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs space-y-1">
                <span className="font-bold text-emerald-700 dark:text-emerald-400">Certification & Phytosanitary Status:</span>
                <p className="text-foreground">{selectedProduct.certification}</p>
              </div>
            </div>

            <DialogFooter className="gap-2 sm:gap-0">
              <Button variant="outline" onClick={() => setSelectedProduct(null)}>
                Close
              </Button>
              <Button 
                onClick={() => {
                  handleAddToCart(selectedProduct.id);
                  setSelectedProduct(null);
                }}
              >
                Add to Cart
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* List Lot Modal */}
      {isListLotModalOpen && (
        <Dialog open={isListLotModalOpen} onOpenChange={setIsListLotModalOpen}>
          <DialogContent className="rounded-2xl sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-xl font-extrabold text-foreground">
                List Produce Lot on Marketplace
              </DialogTitle>
              <DialogDescription>
                Publish directly to commercial buyers and restaurants. Zero listing fees.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleCreateLot} className="space-y-4 py-2">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground">Crop or Product Name</label>
                <Input
                  required
                  placeholder="e.g. Organic Yellow Corn, Heirloom Carrots"
                  value={newLot.name}
                  onChange={(e) => setNewLot({ ...newLot, name: e.target.value })}
                  className="rounded-xl text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-foreground">Category</label>
                  <Select 
                    value={newLot.category} 
                    onValueChange={(val) => setNewLot({ ...newLot, category: val })}
                  >
                    <SelectTrigger className="rounded-xl text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="vegetables">Vegetables</SelectItem>
                      <SelectItem value="fruits">Fruits</SelectItem>
                      <SelectItem value="grains">Grains</SelectItem>
                      <SelectItem value="supplies">Soil & Fertilizers</SelectItem>
                      <SelectItem value="tools">Tools</SelectItem>
                      <SelectItem value="specialty">Specialty</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-foreground">Price ($ USD)</label>
                  <Input
                    required
                    type="number"
                    step="0.01"
                    placeholder="e.g. 3.50"
                    value={newLot.price}
                    onChange={(e) => setNewLot({ ...newLot, price: e.target.value })}
                    className="rounded-xl text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-foreground">Unit Specification</label>
                  <Input
                    placeholder="e.g. per kg, 20kg crate"
                    value={newLot.unit}
                    onChange={(e) => setNewLot({ ...newLot, unit: e.target.value })}
                    className="rounded-xl text-sm"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-foreground">Available Quantity</label>
                  <Input
                    type="number"
                    placeholder="50"
                    value={newLot.stock}
                    onChange={(e) => setNewLot({ ...newLot, stock: e.target.value })}
                    className="rounded-xl text-sm"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground">Farm Origin / Region</label>
                <Input
                  placeholder="e.g. Yakima Valley, WA"
                  value={newLot.location}
                  onChange={(e) => setNewLot({ ...newLot, location: e.target.value })}
                  className="rounded-xl text-sm"
                />
              </div>

              <DialogFooter className="pt-3">
                <Button type="button" variant="outline" onClick={() => setIsListLotModalOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  Publish Lot Now
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      )}

      {/* Checkout Drawer/Modal */}
      <Checkout
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        onPaymentComplete={handlePaymentComplete}
      />
    </main>
  );
} 