import { useEffect, useState } from "react";
import { api } from "@/services/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts";
import { Download } from "lucide-react";

interface OpenDataStats {
  totalDatasets: number;
  totalViews: number;
  totalDownloads: number;
  categoryDownloads: Array<{
    category: string;
    categoryLabel: string;
    count: number;
    downloads: number;
  }>;
  categoryDistribution: Array<{
    category: string;
    categoryLabel: string;
    count: number;
  }>;
  topDirectorates: Array<{
    directorateId: string;
    directorateName: string;
    datasetCount: number;
  }>;
}

interface OpenDataRequestStats {
  totalRequests: number;
  pendingRequests: number;
  approvedRequests: number;
  rejectedRequests: number;
  verifiedRequests: number;
  unverifiedRequests: number;
  fulfilledRequests: number;
  statusDistribution: Array<{
    status: string;
    statusLabel: string;
    count: number;
  }>;
  categoryDistribution: Array<{
    category: string;
    categoryLabel: string;
    count: number;
    fulfilledCount: number;
  }>;
  monthlyTrend: Array<{
    month: string;
    count: number;
    fulfilledCount: number;
  }>;
}

const COLORS = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6", "#EC4899"];

export default function AdminStatistics() {
  const [openDataStats, setOpenDataStats] = useState<OpenDataStats | null>(null);
  const [requestStats, setRequestStats] = useState<OpenDataRequestStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [createdFrom, setCreatedFrom] = useState<string>("");
  const [createdTo, setCreatedTo] = useState<string>("");
  const [exporting, setExporting] = useState(false);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (createdFrom) params.append("createdFrom", createdFrom);
      if (createdTo) params.append("createdTo", createdTo);

      const query = params.toString() ? `?${params.toString()}` : "";

      const [dataRes, reqRes] = await Promise.all([
        api.get(`/opendata/admin/statistics${query}`),
        api.get(`/opendatarequests/admin/statistics${query}`),
      ]);

      setOpenDataStats(dataRes.data);
      setRequestStats(reqRes.data);
    } catch (error) {
      console.error("İstatistikler yüklenirken hata oluştu:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, [createdFrom, createdTo]);

  const handleExport = async (type: "opendata" | "requests", format: "excel" | "pdf") => {
    try {
      setExporting(true);
      const params = new URLSearchParams({ format });
      if (createdFrom) params.append("createdFrom", createdFrom);
      if (createdTo) params.append("createdTo", createdTo);

      const url = type === "opendata"
        ? `/opendata/admin/statistics/export?${params.toString()}`
        : `/opendatarequests/admin/statistics/export?${params.toString()}`;

      const response = await api.get(url, { responseType: "blob" });
      const blob = new Blob([response.data]);
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = `${type}-istatistikleri-${new Date().toISOString().slice(0, 10)}.${format === "pdf" ? "pdf" : "txt"}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error("Dışa aktarırken hata oluştu:", error);
    } finally {
      setExporting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">İstatistikler yükleniyor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Admin İstatistikleri</h1>
      </div>

      {/* Filtre Alanı */}
      <Card>
        <CardHeader>
          <CardTitle>Tarih Filtresi</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 items-end flex-wrap">
            <div>
              <label className="block text-sm font-medium mb-1">Başlangıç Tarihi</label>
              <input
                type="date"
                value={createdFrom}
                onChange={(e) => setCreatedFrom(e.target.value)}
                className="border rounded px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Bitiş Tarihi</label>
              <input
                type="date"
                value={createdTo}
                onChange={(e) => setCreatedTo(e.target.value)}
                className="border rounded px-3 py-2 text-sm"
              />
            </div>
            <button
              onClick={() => {
                setCreatedFrom("");
                setCreatedTo("");
              }}
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded text-sm"
            >
              Temizle
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Açık Veri İstatistikleri */}
      {openDataStats && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Açık Veri Portalı</h2>
            <div className="flex gap-2">
              <button
                onClick={() => handleExport("opendata", "excel")}
                disabled={exporting}
                className="bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white px-3 py-2 rounded text-sm flex items-center gap-2"
              >
                <Download size={16} />
                Excel
              </button>
              <button
                onClick={() => handleExport("opendata", "pdf")}
                disabled={exporting}
                className="bg-red-500 hover:bg-red-600 disabled:bg-gray-400 text-white px-3 py-2 rounded text-sm flex items-center gap-2"
              >
                <Download size={16} />
                PDF
              </button>
            </div>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Toplam Veri Seti</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{openDataStats.totalDatasets}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Toplam Görüntülenme</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{openDataStats.totalViews}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Toplam İndirme</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{openDataStats.totalDownloads}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Ortalama İndirme/Veri</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  {openDataStats.totalDatasets > 0
                    ? (openDataStats.totalDownloads / openDataStats.totalDatasets).toFixed(1)
                    : 0}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Kategoriye göre dağılım */}
          <Card>
            <CardHeader>
              <CardTitle>Kategoriye Göre Veri Seti Dağılımı</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={openDataStats.categoryDistribution}
                    dataKey="count"
                    nameKey="categoryLabel"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label
                  >
                    {openDataStats.categoryDistribution.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Kategoriye göre indirilme */}
          <Card>
            <CardHeader>
              <CardTitle>Kategoriye Göre İndirme Sayısı</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={openDataStats.categoryDownloads}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="categoryLabel" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="downloads" fill="#3B82F6" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* En Çok Veriye Sahip Müdürlükler */}
          {openDataStats.topDirectorates.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>En Çok Veriye Sahip Müdürlükler</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {openDataStats.topDirectorates.map((dir, idx) => (
                    <div key={idx} className="flex items-center justify-between border-b pb-2">
                      <span className="text-sm">{dir.directorateName}</span>
                      <span className="font-semibold text-blue-600">{dir.datasetCount} veri seti</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* Veri İstek İstatistikleri */}
      {requestStats && (
        <div className="space-y-4 mt-8">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Veri İstekleri</h2>
            <div className="flex gap-2">
              <button
                onClick={() => handleExport("requests", "excel")}
                disabled={exporting}
                className="bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white px-3 py-2 rounded text-sm flex items-center gap-2"
              >
                <Download size={16} />
                Excel
              </button>
              <button
                onClick={() => handleExport("requests", "pdf")}
                disabled={exporting}
                className="bg-red-500 hover:bg-red-600 disabled:bg-gray-400 text-white px-3 py-2 rounded text-sm flex items-center gap-2"
              >
                <Download size={16} />
                PDF
              </button>
            </div>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Toplam İstek</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{requestStats.totalRequests}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Beklemede</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-yellow-600">{requestStats.pendingRequests}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Onaylı</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-600">{requestStats.approvedRequests}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Karşılanan</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-blue-600">{requestStats.fulfilledRequests}</div>
              </CardContent>
            </Card>
          </div>

          {/* İstek Durumu */}
          <Card>
            <CardHeader>
              <CardTitle>İstek Durumu Dağılımı</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={requestStats.statusDistribution}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="statusLabel" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#10B981" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Kategori dağılımı */}
          <Card>
            <CardHeader>
              <CardTitle>İstek Kategorileri</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={requestStats.categoryDistribution}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="categoryLabel" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="count" fill="#3B82F6" name="Toplam" />
                  <Bar dataKey="fulfilledCount" fill="#10B981" name="Karşılanan" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Aylık trend */}
          {requestStats.monthlyTrend.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Aylık İstek Trendi</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={requestStats.monthlyTrend}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="count" stroke="#3B82F6" name="Toplam" strokeWidth={2} />
                    <Line type="monotone" dataKey="fulfilledCount" stroke="#10B981" name="Karşılanan" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
}
