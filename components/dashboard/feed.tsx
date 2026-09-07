"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { useAuth } from '@/components/auth-provider';
import { 
  MessageSquare, 
  Heart, 
  Share2, 
  MoreHorizontal, 
  Image as ImageIcon, 
  FileText, 
  X,
  Bookmark,
  Send,
  ShieldCheck,
  Tag,
  CheckCircle2
} from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';

// Initial post data
const initialPosts = [
  {
    id: '1',
    category: 'Harvest Bounties',
    author: {
      name: 'John Farmer',
      role: 'farmer',
      badge: 'Certified Organic Grower',
      avatar: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=150',
    },
    content: 'Just harvested our first batch of heirloom San Marzano tomatoes! Brix sugar level tested at 6.8%. Yield is 18% above five-year average thanks to companion planting with basil and bio-compost top-dressing.',
    image: 'https://images.pexels.com/photos/533280/pexels-photo-533280.jpeg',
    timestamp: '2 hours ago',
    likes: 24,
    isLiked: false,
    isSaved: false,
    commentsList: [
      { id: 'c1', author: 'Elena Rostova', text: 'Stunning yield John! Are you selling bushels on the AgroByte marketplace?' },
      { id: 'c2', author: 'Miguel Grower', text: 'Did you use drip irrigation or furrow?' }
    ]
  },
  {
    id: '2',
    category: 'Foliar Diseases',
    author: {
      name: 'Dr. Sarah Ahmed',
      role: 'expert',
      badge: 'Senior Agronomist, CIMMYT',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150',
    },
    content: 'CRITICAL FIELD BULLETIN: Leaf rust spores (Puccinia striiformis) detected in eastern river valley wheat plots due to consecutive morning dew cycles. Ensure prophylactic fungicide spray schedules or bio-copper formulations before canopy closure.',
    image: null,
    timestamp: '5 hours ago',
    likes: 42,
    isLiked: true,
    isSaved: true,
    commentsList: [
      { id: 'c3', author: 'Vikram Singh', text: 'Thank you Dr. Sarah, inspect flags leaf early tomorrow morning.' }
    ]
  },
  {
    id: '3',
    category: 'Irrigation & Tech',
    author: {
      name: 'Miguel Grower',
      role: 'farmer',
      badge: 'Smart Irrigation Pioneer',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
    },
    content: 'Just installed solar-powered pulse drip lines on our 8-acre brassica plot. Water consumption dropped by 38% compared to overhead sprinklers, while leaf fungal incidents are virtually zero!',
    image: 'https://images.pexels.com/photos/2286895/pexels-photo-2286895.jpeg',
    timestamp: '1 day ago',
    likes: 31,
    isLiked: false,
    isSaved: false,
    commentsList: [
      { id: 'c4', author: 'John Farmer', text: 'What pressure regulators are you running?' }
    ]
  },
];

const CATEGORIES = ['All Updates', 'Harvest Bounties', 'Foliar Diseases', 'Irrigation & Tech'];

export function Feed() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [posts, setPosts] = useState(initialPosts);
  const [activeCategory, setActiveCategory] = useState('All Updates');
  const [postContent, setPostContent] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Harvest Bounties');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Expanded comments tracking
  const [expandedComments, setExpandedComments] = useState<Record<string, boolean>>({});
  const [newCommentText, setNewCommentText] = useState<Record<string, string>>({});

  const filteredPosts = activeCategory === 'All Updates'
    ? posts
    : posts.filter(p => p.category === activeCategory);

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!postContent.trim() && !selectedImage) {
      toast({
        title: 'Post cannot be empty',
        description: 'Please add some text or an image to your post.',
        variant: 'destructive',
      });
      return;
    }
    
    setIsSubmitting(true);
    
    setTimeout(() => {
      const newPost = {
        id: Date.now().toString(),
        category: selectedCategory,
        author: {
          name: user?.name || 'Tariq Rahman',
          role: user?.role || 'farmer',
          badge: 'AgroByte Verified Contributor',
          avatar: user?.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
        },
        content: postContent,
        image: selectedImage,
        timestamp: 'Just now',
        likes: 0,
        isLiked: false,
        isSaved: false,
        commentsList: []
      };
      
      setPosts([newPost, ...posts]);
      setPostContent('');
      setSelectedImage(null);
      setIsSubmitting(false);
      
      toast({
        title: 'Field Report Published',
        description: 'Your insight is now visible to the agricultural network.',
      });
    }, 600);
  };

  const handleLike = (postId: string) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        const nextLiked = !post.isLiked;
        return {
          ...post,
          isLiked: nextLiked,
          likes: nextLiked ? post.likes + 1 : Math.max(0, post.likes - 1)
        };
      }
      return post;
    }));
  };

  const handleSaveToggle = (postId: string) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        const nextSaved = !post.isSaved;
        toast({
          title: nextSaved ? 'Post Bookmarked' : 'Post Unsaved',
          description: nextSaved ? 'Saved to your agronomy bookmarks.' : 'Removed from bookmarks.',
        });
        return { ...post, isSaved: nextSaved };
      }
      return post;
    }));
  };

  const toggleComments = (postId: string) => {
    setExpandedComments(prev => ({ ...prev, [postId]: !prev[postId] }));
  };

  const handleAddComment = (postId: string) => {
    const text = (newCommentText[postId] || '').trim();
    if (!text) return;

    setPosts(posts.map(p => {
      if (p.id === postId) {
        return {
          ...p,
          commentsList: [
            ...p.commentsList,
            {
              id: Date.now().toString(),
              author: user?.name || 'Tariq Rahman',
              text
            }
          ]
        };
      }
      return p;
    }));

    setNewCommentText(prev => ({ ...prev, [postId]: '' }));
    toast({
      title: 'Reply Posted',
      description: 'Your contribution has been added to the discussion.',
    });
  };

  const handleImageSelect = () => {
    const mockImages = [
      'https://images.pexels.com/photos/1153369/pexels-photo-1153369.jpeg',
      'https://images.pexels.com/photos/707756/pexels-photo-707756.jpeg',
      'https://images.pexels.com/photos/3004923/pexels-photo-3004923.jpeg',
    ];
    const randomImage = mockImages[Math.floor(Math.random() * mockImages.length)];
    setSelectedImage(randomImage);
  };

  return (
    <div className="space-y-6">
      
      {/* Category Pills */}
      <div className="flex flex-wrap items-center gap-2">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors ${
              activeCategory === cat
                ? 'bg-primary text-primary-foreground shadow-xs'
                : 'bg-card border text-muted-foreground hover:text-foreground hover:bg-muted/50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Create Post Card */}
      <Card className="rounded-2xl border bg-card shadow-xs overflow-hidden">
        <CardHeader className="p-5 pb-3">
          <h2 className="text-base font-bold text-foreground">Share Field Intelligence or Query</h2>
        </CardHeader>
        <CardContent className="p-5 pt-0 space-y-3">
          <form onSubmit={handlePostSubmit} className="space-y-3">
            <div className="flex gap-3">
              <Avatar className="h-10 w-10 border border-primary/20 shrink-0">
                <AvatarImage src={user?.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150'} />
                <AvatarFallback className="bg-primary/10 text-primary font-bold">TR</AvatarFallback>
              </Avatar>
              <Textarea
                placeholder={`What are you observing in your fields today, ${user?.name ? user.name.split(' ')[0] : 'Tariq'}?`}
                className="flex-1 resize-none rounded-xl bg-muted/30 border text-sm min-h-[90px] focus-visible:ring-primary"
                value={postContent}
                onChange={(e) => setPostContent(e.target.value)}
              />
            </div>
            
            {selectedImage && (
              <div className="mt-2 relative inline-block rounded-xl overflow-hidden border">
                <Image
                  src={selectedImage}
                  alt="Selected attachment"
                  width={220}
                  height={140}
                  className="object-cover rounded-xl"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-1.5 right-1.5 h-6 w-6 rounded-full bg-black/60 text-white hover:bg-black"
                  onClick={() => setSelectedImage(null)}
                >
                  <X className="h-3.5 w-3.5" />
                </Button>
              </div>
            )}
          </form>
        </CardContent>
        <CardFooter className="p-5 border-t bg-muted/20 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="rounded-xl text-xs" onClick={handleImageSelect}>
              <ImageIcon className="h-3.5 w-3.5 mr-1.5 text-primary" />
              Attach Photo
            </Button>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="text-xs rounded-xl bg-card border px-3 py-1.5 text-muted-foreground focus:outline-hidden"
            >
              <option value="Harvest Bounties">Harvest Bounties</option>
              <option value="Foliar Diseases">Foliar Diseases</option>
              <option value="Irrigation & Tech">Irrigation & Tech</option>
            </select>
          </div>
          <Button 
            type="submit" 
            size="sm" 
            className="rounded-xl font-semibold shadow-xs"
            onClick={handlePostSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Publishing...' : 'Publish Field Note'}
          </Button>
        </CardFooter>
      </Card>

      {/* Posts Feed */}
      <div className="space-y-6">
        {filteredPosts.map((post) => (
          <Card key={post.id} className="overflow-hidden rounded-2xl border bg-card shadow-xs card-hover">
            <CardHeader className="p-5 pb-3">
              <div className="flex justify-between items-start gap-4">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10 border border-primary/20">
                    <AvatarImage src={post.author.avatar} alt={post.author.name} />
                    <AvatarFallback className="bg-primary/10 text-primary font-bold">
                      {post.author.name.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-foreground">{post.author.name}</span>
                      <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                        <ShieldCheck className="h-3 w-3" />
                        {post.author.badge}
                      </span>
                    </div>
                    <div className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                      <span className="capitalize">{post.author.role}</span>
                      <span>•</span>
                      <span>{post.timestamp}</span>
                      <span>•</span>
                      <span className="text-primary font-medium">{post.category}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className={`h-8 w-8 rounded-xl ${post.isSaved ? 'text-primary' : 'text-muted-foreground'}`}
                    onClick={() => handleSaveToggle(post.id)}
                  >
                    <Bookmark className={`h-4 w-4 ${post.isSaved ? 'fill-primary' : ''}`} />
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8 rounded-xl text-muted-foreground">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="rounded-xl">
                      <DropdownMenuItem onClick={() => handleSaveToggle(post.id)}>
                        {post.isSaved ? 'Unsave Post' : 'Save Post'}
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => toast({ title: "Report Submitted", description: "Flagged for moderator review." })}>
                        Report Bulletin
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-5 pt-1 space-y-3">
              <p className="text-sm leading-relaxed text-foreground whitespace-pre-line">{post.content}</p>
              {post.image && (
                <div className="rounded-xl overflow-hidden border bg-muted/30">
                  <Image
                    src={post.image}
                    alt="Post image"
                    width={800}
                    height={400}
                    className="w-full max-h-80 object-cover"
                  />
                </div>
              )}
            </CardContent>

            <CardFooter className="p-4 border-t bg-muted/10 flex flex-col items-stretch gap-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className={`rounded-xl text-xs ${post.isLiked ? 'text-rose-600 bg-rose-500/10' : 'text-muted-foreground'}`}
                    onClick={() => handleLike(post.id)}
                  >
                    <Heart className={`h-4 w-4 mr-1.5 ${post.isLiked ? 'fill-rose-600' : ''}`} />
                    <span>{post.likes}</span>
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="rounded-xl text-xs text-muted-foreground"
                    onClick={() => toggleComments(post.id)}
                  >
                    <MessageSquare className="h-4 w-4 mr-1.5 text-primary" />
                    <span>{post.commentsList.length} Comments</span>
                  </Button>
                </div>

                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="rounded-xl text-xs text-muted-foreground"
                  onClick={() => toast({ title: "Link Copied", description: "Bulletin URL copied to clipboard." })}
                >
                  <Share2 className="h-4 w-4 mr-1.5" />
                  Share
                </Button>
              </div>

              {/* Interactive Comments Drawer */}
              {expandedComments[post.id] && (
                <div className="pt-3 border-t space-y-3 animate-in fade-in">
                  <div className="space-y-2">
                    {post.commentsList.map(c => (
                      <div key={c.id} className="p-3 rounded-xl bg-card border text-xs space-y-1">
                        <span className="font-bold text-foreground">{c.author}</span>
                        <p className="text-muted-foreground leading-relaxed">{c.text}</p>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-2 pt-1">
                    <Input
                      placeholder="Add agronomic note or reply..."
                      className="rounded-xl text-xs h-9 bg-card"
                      value={newCommentText[post.id] || ''}
                      onChange={(e) => setNewCommentText({ ...newCommentText, [post.id]: e.target.value })}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          handleAddComment(post.id);
                        }
                      }}
                    />
                    <Button 
                      size="sm" 
                      className="rounded-xl h-9 px-3 shrink-0" 
                      onClick={() => handleAddComment(post.id)}
                    >
                      <Send className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}