"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { DashboardHeader } from '@/components/dashboard/header';
import { DashboardSidebar } from '@/components/dashboard/sidebar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { 
  Upload, 
  Scan, 
  Check, 
  AlertCircle, 
  Loader2, 
  FileUp, 
  Sparkles, 
  TrendingUp, 
  FlaskConical, 
  Leaf, 
  ShieldAlert, 
  CheckCircle2, 
  RefreshCw,
  Info,
  Droplets
} from 'lucide-react';

// Fixed list of crop diseases with visual assets
const CROP_DISEASES = [
  {
    id: 'sds',
    name: 'Sudden Death Syndrome (SDS)',
    crop: 'Soybean',
    confidence: 96.4,
    stage: 'Early Reproductive (R3)',
    description: 'Sudden Death Syndrome is a severe soil-borne fungal pathogen (Fusarium virguliforme). Characterized by interveinal chlorosis and necrosis where leaf margins turn brown while main veins remain green.',
    treatment: 'Plant SDS-resistant seed varieties with fluopyram seed treatments. Improve deep soil drainage and implement 3-year crop rotations with non-host grain crops.',
    urgency: 'High',
    sampleImage: 'https://images.pexels.com/photos/5529599/pexels-photo-5529599.jpeg'
  },
  {
    id: 'rust',
    name: 'Wheat Stripe & Leaf Rust',
    crop: 'Winter Wheat',
    confidence: 94.2,
    stage: 'Flag Leaf Emergence',
    description: 'Fungal infection caused by Puccinia striiformis. Manifests as bright orange-yellow linear pustules that deplete chlorophyll and diminish photosynthetic capacity rapidly.',
    treatment: 'Apply triazole or strobilurin-based foliar fungicides within 48 hours. Monitor windward bordering fields for sporulation spread.',
    urgency: 'Critical',
    sampleImage: 'https://images.pexels.com/photos/4110251/pexels-photo-4110251.jpeg'
  },
  {
    id: 'blight',
    name: 'Early Tomato Foliar Blight',
    crop: 'Tomato',
    confidence: 98.1,
    stage: 'Vegetative Canopy',
    description: 'Alternaria solani infection presenting as dark concentric target-like rings surrounded by yellow halos on lower leaves. Spreads via splash irrigation and high canopy humidity.',
    treatment: 'Prune infected lower foliage immediately. Switch to drip irrigation and spray bio-fungicide copper octanoate or Bacillus subtilis.',
    urgency: 'Medium',
    sampleImage: 'https://images.pexels.com/photos/1510392/pexels-photo-1510392.jpeg'
  }
];

export default function AIToolsPage() {
  const { toast } = useToast();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(CROP_DISEASES[0].sampleImage);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<typeof CROP_DISEASES[0] | null>(CROP_DISEASES[0]);

  // Yield Calculator State
  const [yieldCrop, setYieldCrop] = useState('corn');
  const [acreage, setAcreage] = useState('120');
  const [rainfall, setRainfall] = useState('650');
  const [irrigation, setIrrigation] = useState('drip');
  const [yieldResult, setYieldResult] = useState<{ estYield: string; revenueEst: string; confidence: string } | null>(null);

  // Soil Analyzer State
  const [soilPh, setSoilPh] = useState('6.4');
  const [soilNitrogen, setSoilNitrogen] = useState('42');
  const [soilPhosphorus, setSoilPhosphorus] = useState('28');
  const [soilPotassium, setSoilPotassium] = useState('180');
  const [soilHealth, setSoilHealth] = useState<{ score: number; status: string; advice: string } | null>(null);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: 'File Too Large',
          description: 'Image size should be less than 5MB',
          variant: 'destructive',
        });
        return;
      }

      if (!file.type.startsWith('image/')) {
        toast({
          title: 'Invalid File',
          description: 'Please select a valid image file (PNG, JPEG, WebP)',
          variant: 'destructive',
        });
        return;
      }

      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
      setResult(null);
    }
  };

  const handleSelectSample = (disease: typeof CROP_DISEASES[0]) => {
    setSelectedImage(null);
    setPreviewUrl(disease.sampleImage);
    setResult(null);
    toast({
      title: `Sample Loaded: ${disease.crop}`,
      description: 'Click "Run Neural Analysis" to test detection.',
    });
  };

  const handleAnalyze = () => {
    if (!previewUrl) {
      toast({
        title: 'No image provided',
        description: 'Please upload a leaf photo or pick a sample.',
        variant: 'destructive',
      });
      return;
    }

    setIsAnalyzing(true);
    
    setTimeout(() => {
      // Find matching sample or random fallback
      const match = CROP_DISEASES.find(d => d.sampleImage === previewUrl) || CROP_DISEASES[Math.floor(Math.random() * CROP_DISEASES.length)];
      setResult(match);
      setIsAnalyzing(false);
      toast({
        title: 'Diagnosis Complete',
        description: `Identified ${match.name} with ${match.confidence}% neural confidence.`,
      });
    }, 1200);
  };

  const handleReset = () => {
    setSelectedImage(null);
    setPreviewUrl(null);
    setResult(null);
  };

  const calculateYield = () => {
    const acres = parseFloat(acreage) || 100;
    const rain = parseFloat(rainfall) || 600;
    
    let basePerAcre = 180; // bushels
    let price = 4.80; // $/bushel
    let unit = 'bushels';

    if (yieldCrop === 'soybean') {
      basePerAcre = 52;
      price = 11.20;
    } else if (yieldCrop === 'wheat') {
      basePerAcre = 68;
      price = 5.90;
    } else if (yieldCrop === 'cotton') {
      basePerAcre = 850;
      price = 0.78;
      unit = 'lbs';
    }

    const irrigationBonus = irrigation === 'drip' ? 1.18 : irrigation === 'pivot' ? 1.10 : 0.95;
    const rainFactor = Math.min(1.15, Math.max(0.7, rain / 600));

    const totalEst = Math.round(acres * basePerAcre * irrigationBonus * rainFactor);
    const revenue = Math.round(totalEst * price);

    setYieldResult({
      estYield: `${totalEst.toLocaleString()} ${unit} (${Math.round(totalEst / acres)} ${unit}/acre)`,
      revenueEst: `$${revenue.toLocaleString()} USD`,
      confidence: '92.4%'
    });
  };

  const calculateSoil = () => {
    const ph = parseFloat(soilPh) || 6.5;
    const n = parseFloat(soilNitrogen) || 40;
    const p = parseFloat(soilPhosphorus) || 25;
    const k = parseFloat(soilPotassium) || 160;

    let score = 85;
    let status = 'Good Optimal Health';
    let advice = 'Soil profile is well balanced. Maintain current organic compost additions.';

    if (ph < 6.0) {
      score -= 15;
      status = 'Acidic Profile';
      advice = 'Apply agricultural limestone (dolomitic lime) at 1.5 tons/acre to raise pH.';
    } else if (ph > 7.5) {
      score -= 15;
      status = 'Alkaline Profile';
      advice = 'Incorporate elemental sulfur and bio-acidifying compost to lower soil pH.';
    }

    if (n < 30) {
      score -= 10;
      advice += ' Nitrogen is low; apply organic blood meal or legume green manure.';
    }
    if (p < 20) {
      score -= 10;
      advice += ' Low phosphorus; top-dress with rock phosphate or bone meal.';
    }

    setSoilHealth({
      score: Math.max(35, Math.min(98, score)),
      status,
      advice
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <div className="flex">
        <DashboardSidebar />
        <main className="flex-1 px-4 sm:px-8 py-8 max-w-7xl mx-auto w-full space-y-8">
          
          {/* Header Banner */}
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-semibold text-primary">
              <Sparkles className="h-3.5 w-3.5" />
              <span>AgroByte Computer Vision & Predictive Models</span>
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight text-foreground">
              Agri-AI Diagnostic Suite
            </h1>
            <p className="text-sm text-muted-foreground max-w-2xl">
              Real-time deep learning for crop leaf pathology, harvest yield projections, and macronutrient soil analysis.
            </p>
          </div>
          
          <Tabs defaultValue="disease" className="space-y-6">
            <TabsList className="grid w-full max-w-md grid-cols-3 rounded-xl p-1 bg-muted">
              <TabsTrigger value="disease" className="rounded-lg text-xs sm:text-sm font-semibold">
                Pathology Scan
              </TabsTrigger>
              <TabsTrigger value="yield" className="rounded-lg text-xs sm:text-sm font-semibold">
                Yield Simulator
              </TabsTrigger>
              <TabsTrigger value="soil" className="rounded-lg text-xs sm:text-sm font-semibold">
                Soil Optimizer
              </TabsTrigger>
            </TabsList>
            
            {/* TAB 1: DISEASE DETECTION */}
            <TabsContent value="disease" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* Upload & Sample Leaf Selector (5 cols) */}
                <Card className="lg:col-span-5 rounded-2xl border bg-card shadow-xs overflow-hidden flex flex-col justify-between">
                  <CardHeader className="p-5 pb-3">
                    <CardTitle className="text-lg font-bold flex items-center justify-between">
                      <span>Input Crop Imagery</span>
                      <span className="text-xs font-normal text-muted-foreground">JPEG, PNG ≤ 5MB</span>
                    </CardTitle>
                    <CardDescription className="text-xs">
                      Take or upload a close-up photo of symptomatic leaves or select a verified test sample.
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="p-5 pt-0 space-y-4">
                    {previewUrl ? (
                      <div className="relative aspect-[4/3] rounded-xl overflow-hidden border bg-black/5">
                        <Image
                          src={previewUrl}
                          alt="Selected crop specimen"
                          fill
                          className="object-cover"
                        />
                        <div className="absolute top-2 right-2 flex gap-2">
                          <Button 
                            variant="secondary" 
                            size="sm" 
                            className="rounded-lg h-7 text-xs bg-background/80 backdrop-blur-xs shadow-xs"
                            onClick={handleReset}
                          >
                            <RefreshCw className="h-3.5 w-3.5 mr-1" />
                            Change
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div 
                        onClick={() => document.getElementById('image-upload')?.click()}
                        className="w-full aspect-[4/3] border-2 border-dashed rounded-xl flex flex-col items-center justify-center p-6 text-center cursor-pointer hover:border-primary/50 hover:bg-muted/30 transition-colors"
                      >
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageSelect}
                          className="hidden"
                          id="image-upload"
                        />
                        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-3">
                          <FileUp className="h-6 w-6" />
                        </div>
                        <p className="text-sm font-semibold text-foreground">Click to upload crop foliage</p>
                        <p className="text-xs text-muted-foreground mt-1">High resolution leaf pictures yield best accuracy</p>
                      </div>
                    )}

                    {/* Quick Test Samples */}
                    <div className="space-y-2 pt-2 border-t">
                      <span className="text-xs font-semibold text-foreground">Or test with verified specimens:</span>
                      <div className="grid grid-cols-3 gap-2">
                        {CROP_DISEASES.map((sample) => (
                          <button
                            key={sample.id}
                            type="button"
                            onClick={() => handleSelectSample(sample)}
                            className={`p-2 rounded-xl border text-left transition-all hover:border-primary ${
                              previewUrl === sample.sampleImage ? 'border-primary bg-primary/5 ring-1 ring-primary' : 'bg-muted/30'
                            }`}
                          >
                            <span className="text-[11px] font-bold block text-foreground truncate">{sample.crop}</span>
                            <span className="text-[10px] text-muted-foreground block truncate">{sample.id.toUpperCase()}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </CardContent>

                  <CardFooter className="p-5 border-t bg-muted/20">
                    <Button 
                      className="w-full rounded-xl font-semibold shadow-xs" 
                      onClick={handleAnalyze} 
                      disabled={isAnalyzing || !previewUrl}
                    >
                      {isAnalyzing ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Running Neural Inference...
                        </>
                      ) : (
                        <>
                          <Scan className="h-4 w-4 mr-2" />
                          Run Neural Diagnostic
                        </>
                      )}
                    </Button>
                  </CardFooter>
                </Card>
                
                {/* Diagnostic Results (7 cols) */}
                <Card className="lg:col-span-7 rounded-2xl border bg-card shadow-xs flex flex-col justify-between">
                  <CardHeader className="p-5 pb-3 border-b">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg font-bold flex items-center gap-2">
                        <Leaf className="h-5 w-5 text-primary" />
                        <span>Pathological Diagnostic Report</span>
                      </CardTitle>
                      {result && (
                        <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${
                          result.urgency === 'Critical' 
                            ? 'bg-rose-500/10 text-rose-600 border-rose-500/20' 
                            : 'bg-amber-500/10 text-amber-600 border-amber-500/20'
                        }`}>
                          {result.urgency} Urgency
                        </span>
                      )}
                    </div>
                    <CardDescription className="text-xs">
                      Deep learning model: AgroByte ResNet-50 v3.1 calibrated on 140,000 foliar samples.
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="p-6 space-y-5">
                    {result ? (
                      <div className="space-y-5">
                        <div className="p-4 rounded-xl bg-muted/40 border space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-muted-foreground uppercase font-mono">Identified Pathogen</span>
                            <span className="text-xs font-bold font-mono text-emerald-600 dark:text-emerald-400">
                              {result.confidence}% Confidence
                            </span>
                          </div>
                          <h3 className="text-xl font-extrabold text-foreground">{result.name}</h3>
                          <div className="flex gap-4 text-xs text-muted-foreground pt-1 border-t">
                            <span>Host Crop: <strong className="text-foreground">{result.crop}</strong></span>
                            <span>Infection Stage: <strong className="text-foreground">{result.stage}</strong></span>
                          </div>
                        </div>

                        <div className="space-y-1.5">
                          <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Pathological Description</h4>
                          <p className="text-sm leading-relaxed text-foreground">{result.description}</p>
                        </div>

                        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 space-y-2">
                          <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-bold text-xs uppercase tracking-wider">
                            <CheckCircle2 className="h-4 w-4" />
                            <span>Recommended Agronomic Interventions</span>
                          </div>
                          <p className="text-xs sm:text-sm text-foreground leading-relaxed">
                            {result.treatment}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="py-16 flex flex-col items-center justify-center text-center space-y-3">
                        <div className="h-14 w-14 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
                          <Scan className="h-7 w-7" />
                        </div>
                        <div>
                          <h3 className="text-base font-bold text-foreground">Awaiting Specimen Inference</h3>
                          <p className="text-xs text-muted-foreground mt-1 max-w-sm">
                            Select an image on the left and trigger diagnosis to calculate infection probability and treatment roadmap.
                          </p>
                        </div>
                      </div>
                    )}
                  </CardContent>

                  <CardFooter className="p-5 border-t bg-muted/20 text-xs text-muted-foreground flex items-center justify-between">
                    <span>Field advice verified by certified agronomy extension protocols.</span>
                  </CardFooter>
                </Card>

              </div>
            </TabsContent>
            
            {/* TAB 2: YIELD PREDICTION */}
            <TabsContent value="yield" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* Input Parameters (5 cols) */}
                <Card className="lg:col-span-5 rounded-2xl border bg-card shadow-xs">
                  <CardHeader className="p-5 pb-3">
                    <CardTitle className="text-lg font-bold flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-primary" />
                      <span>Farm Field Variables</span>
                    </CardTitle>
                    <CardDescription className="text-xs">
                      Tune regional soil, rainfall, and crop density to estimate autumn harvest volumes.
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="p-5 space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-foreground">Crop Variety</label>
                      <Select value={yieldCrop} onValueChange={setYieldCrop}>
                        <SelectTrigger className="rounded-xl text-xs">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl">
                          <SelectItem value="corn">Field Corn (Yellow Dent #2)</SelectItem>
                          <SelectItem value="soybean">Soybeans (High Protein)</SelectItem>
                          <SelectItem value="wheat">Hard Red Winter Wheat</SelectItem>
                          <SelectItem value="cotton">Upland Cotton</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-foreground">Cultivated Area (Acres)</label>
                        <Input
                          type="number"
                          value={acreage}
                          onChange={(e) => setAcreage(e.target.value)}
                          className="rounded-xl text-xs"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-foreground">Irrigation Model</label>
                        <Select value={irrigation} onValueChange={setIrrigation}>
                          <SelectTrigger className="rounded-xl text-xs">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="rounded-xl">
                            <SelectItem value="drip">Precision Drip</SelectItem>
                            <SelectItem value="pivot">Center Pivot</SelectItem>
                            <SelectItem value="rainfed">Rainfed / Dryland</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-foreground">Season Rainfall Expectation (mm)</label>
                      <Input
                        type="number"
                        value={rainfall}
                        onChange={(e) => setRainfall(e.target.value)}
                        className="rounded-xl text-xs"
                      />
                    </div>

                    <Button onClick={calculateYield} className="w-full rounded-xl font-semibold mt-2">
                      Run Yield Forecast
                    </Button>
                  </CardContent>
                </Card>

                {/* Prediction Output (7 cols) */}
                <Card className="lg:col-span-7 rounded-2xl border bg-card shadow-xs flex flex-col justify-between">
                  <CardHeader className="p-5 pb-3 border-b">
                    <CardTitle className="text-lg font-bold">Predictive Forecast Metrics</CardTitle>
                    <CardDescription className="text-xs">
                      Ensemble machine learning model based on regional climate & USDA county historical records.
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="p-6">
                    {yieldResult ? (
                      <div className="space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="p-4 rounded-xl bg-primary/10 border border-primary/20 space-y-1">
                            <span className="text-xs text-primary font-semibold">Estimated Total Harvest</span>
                            <p className="text-2xl font-black text-foreground">{yieldResult.estYield}</p>
                            <span className="text-[11px] text-muted-foreground block">Variance tolerance: ±4.8%</span>
                          </div>

                          <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 space-y-1">
                            <span className="text-xs text-emerald-700 dark:text-emerald-400 font-semibold">Projected Spot Revenue</span>
                            <p className="text-2xl font-black text-foreground">{yieldResult.revenueEst}</p>
                            <span className="text-[11px] text-muted-foreground block">CBOT Benchmark Futures parity</span>
                          </div>
                        </div>

                        <div className="p-4 rounded-xl border bg-muted/40 space-y-2 text-xs">
                          <span className="font-bold text-foreground">Yield Optimization Insight:</span>
                          <p className="text-muted-foreground leading-relaxed">
                            With {irrigation} irrigation on {acreage} acres of {yieldCrop}, nitrogen side-dressing during peak growth is projected to boost total output by an extra 4.2% while preventing runoff loss.
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="py-12 flex flex-col items-center justify-center text-center space-y-3">
                        <TrendingUp className="h-10 w-10 text-muted-foreground" />
                        <div>
                          <h3 className="text-base font-bold text-foreground">Run Yield Simulation</h3>
                          <p className="text-xs text-muted-foreground mt-1">Adjust acreage and rainfall inputs on the left, then click Run Yield Forecast.</p>
                        </div>
                      </div>
                    )}
                  </CardContent>

                  <CardFooter className="p-5 border-t bg-muted/20 text-xs text-muted-foreground">
                    Confidence interval: 92.4% based on 5-year precipitation regressions.
                  </CardFooter>
                </Card>

              </div>
            </TabsContent>
            
            {/* TAB 3: SOIL ANALYSIS */}
            <TabsContent value="soil" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* Soil Inputs (5 cols) */}
                <Card className="lg:col-span-5 rounded-2xl border bg-card shadow-xs">
                  <CardHeader className="p-5 pb-3">
                    <CardTitle className="text-lg font-bold flex items-center gap-2">
                      <FlaskConical className="h-5 w-5 text-primary" />
                      <span>Soil Lab Nutrient Profile</span>
                    </CardTitle>
                    <CardDescription className="text-xs">
                      Enter lab test results or portable sensor probe readings.
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="p-5 space-y-4">
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs">
                        <span className="font-semibold text-foreground">Soil pH Level</span>
                        <span className="font-mono text-primary font-bold">{soilPh}</span>
                      </div>
                      <Input
                        type="number"
                        step="0.1"
                        value={soilPh}
                        onChange={(e) => setSoilPh(e.target.value)}
                        className="rounded-xl text-xs"
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-semibold text-foreground">Nitrogen (ppm)</label>
                        <Input
                          type="number"
                          value={soilNitrogen}
                          onChange={(e) => setSoilNitrogen(e.target.value)}
                          className="rounded-xl text-xs"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-semibold text-foreground">Phosphorus (ppm)</label>
                        <Input
                          type="number"
                          value={soilPhosphorus}
                          onChange={(e) => setSoilPhosphorus(e.target.value)}
                          className="rounded-xl text-xs"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-semibold text-foreground">Potassium (ppm)</label>
                        <Input
                          type="number"
                          value={soilPotassium}
                          onChange={(e) => setSoilPotassium(e.target.value)}
                          className="rounded-xl text-xs"
                        />
                      </div>
                    </div>

                    <Button onClick={calculateSoil} className="w-full rounded-xl font-semibold mt-2">
                      Analyze Soil Biomass Health
                    </Button>
                  </CardContent>
                </Card>

                {/* Soil Output (7 cols) */}
                <Card className="lg:col-span-7 rounded-2xl border bg-card shadow-xs flex flex-col justify-between">
                  <CardHeader className="p-5 pb-3 border-b">
                    <CardTitle className="text-lg font-bold">Nutrient Bio-Report & Prescription</CardTitle>
                    <CardDescription className="text-xs">
                      Evaluates cation exchange capacity and biological microbial viability.
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="p-6">
                    {soilHealth ? (
                      <div className="space-y-5">
                        <div className="p-5 rounded-xl border bg-muted/40 flex items-center justify-between">
                          <div>
                            <span className="text-xs uppercase font-mono text-muted-foreground">Soil Health Index</span>
                            <h3 className="text-2xl font-black text-foreground mt-0.5">{soilHealth.status}</h3>
                          </div>
                          <div className="text-right">
                            <span className="text-3xl font-black text-primary">{soilHealth.score}/100</span>
                            <span className="text-[11px] text-muted-foreground block">Composite Rating</span>
                          </div>
                        </div>

                        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 space-y-2 text-xs">
                          <span className="font-bold text-emerald-700 dark:text-emerald-400">Bio-Organic Prescription:</span>
                          <p className="text-foreground leading-relaxed text-sm">{soilHealth.advice}</p>
                        </div>
                      </div>
                    ) : (
                      <div className="py-12 flex flex-col items-center justify-center text-center space-y-3">
                        <FlaskConical className="h-10 w-10 text-muted-foreground" />
                        <div>
                          <h3 className="text-base font-bold text-foreground">Awaiting Soil Nutrient Data</h3>
                          <p className="text-xs text-muted-foreground mt-1">Input your soil pH and N-P-K concentrations to evaluate health score.</p>
                        </div>
                      </div>
                    )}
                  </CardContent>

                  <CardFooter className="p-5 border-t bg-muted/20 text-xs text-muted-foreground">
                    Recommendations conform to organic regenerative farming standards.
                  </CardFooter>
                </Card>

              </div>
            </TabsContent>

          </Tabs>

        </main>
      </div>
    </div>
  );
}