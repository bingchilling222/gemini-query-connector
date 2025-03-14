
import { Card } from "@/components/ui/card";
import { shopData } from "@/lib/gemini";

const ShopTable = () => {
  return (
    <Card className="w-full border border-border overflow-hidden">
      <div className="p-4 bg-secondary/50 border-b border-border">
        <h3 className="text-sm font-medium">Parduotuvių kontekstas</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-secondary/30">
              <th className="py-3 px-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Parduotuvė
              </th>
              <th className="py-3 px-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Detalus aprašymas
              </th>
            </tr>
          </thead>
          <tbody>
            {shopData.map((shop, index) => (
              <tr 
                key={index} 
                className={index % 2 === 0 ? "bg-white" : "bg-secondary/20"}
              >
                <td className="py-3 px-4 text-sm">{shop.name}</td>
                <td className="py-3 px-4 text-sm">{shop.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default ShopTable;
