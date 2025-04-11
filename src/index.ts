import { McpServer, ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import axios from 'axios';

const apiKey = process.env.DOORDASH_API_KEY;

// Create an MCP server
const server = new McpServer({
  name: "DoorDashDriveAPI",
  version: "1.0.0"
});

// Helper function to make API requests with authentication
async function makeApiRequest(url: string, method: string, data?: any) {
  try {
    const response = await axios({
      url: url,
      method: method,
      data: data,
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error("API request failed:", error);
    throw error; // Re-throw the error for the tool to handle
  }
}

// Tool: Create Quote
server.tool("create_quote",
  {
    external_delivery_id: z.string(),
    locale: z.string().optional(),
    order_fulfillment_method: z.string().optional(),
    origin_facility_id: z.string().optional(),
    pickup_address: z.string().optional(),
    pickup_business_name: z.string().optional(),
    pickup_phone_number: z.string().optional(),
    pickup_instructions: z.string().optional(),
    pickup_reference_tag: z.string().optional(),
    pickup_external_business_id: z.string().optional(),
    pickup_external_store_id: z.string().optional(),
    pickup_verification_metadata: z.record(z.any()).optional(),
    dropoff_address: z.string(),
    dropoff_business_name: z.string().optional(),
    dropoff_location: z.record(z.any()).optional(),
    dropoff_phone_number: z.string(),
    dropoff_instructions: z.string().optional(),
    dropoff_contact_given_name: z.string().optional(),
    dropoff_contact_family_name: z.string().optional(),
    dropoff_contact_send_notifications: z.boolean().optional(),
    dropoff_options: z.record(z.any()).optional(),
    dropoff_address_components: z.record(z.any()).optional(),
    dropoff_pin_code_verification_metadata: z.record(z.any()).optional(),
    shopping_options: z.record(z.any()).optional(),
    order_value: z.number().optional(),
    items: z.array(z.record(z.any())).optional(),
    pickup_time: z.string().optional(),
    dropoff_time: z.string().optional(),
    pickup_window: z.record(z.any()).optional(),
    dropoff_window: z.record(z.any()).optional(),
    customer_expected_sla: z.any().optional(),
    expires_by: z.any().optional(),
    shipping_label_metadata: z.record(z.any()).optional(),
    contactless_dropoff: z.boolean().optional(),
    action_if_undeliverable: z.string().optional(),
    tip: z.number().optional(),
    order_contains: z.record(z.any()).optional(),
    dasher_allowed_vehicles: z.array(z.string()).optional(),
    dropoff_requires_signature: z.boolean().optional(),
    promotion_id: z.string().optional(),
    dropoff_cash_on_delivery: z.number().optional(),
    order_route_type: z.string().optional(),
    order_route_items: z.array(z.string()).optional()
  },
  async (params) => {
    try {
      const response = await makeApiRequest(
        'https://openapi.doordash.com/drive/v2/quotes',
        'POST',
        params
      );
      return {
        content: [{ type: "text", text: String(JSON.stringify(response)) }]
      };
    } catch (error: any) {
      return {
        content: [{ type: "text", text: `Error: ${error.message}` }]
      };
    }
  }
);

// Tool: Accept Quote
server.tool("accept_quote",
  {
    external_delivery_id: z.string(),
    tip: z.number().optional(),
    dropoff_phone_number: z.string().optional()
  },
  async ({ external_delivery_id, tip, dropoff_phone_number }) => {
    try {
      const response = await makeApiRequest(
        `https://openapi.doordash.com/drive/v2/quotes/${external_delivery_id}/accept`,
        'POST',
        { tip: tip, dropoff_phone_number: dropoff_phone_number }
      );
      return {
        content: [{ type: "text", text: String(JSON.stringify(response)) }]
      };
    } catch (error: any) {
      return {
        content: [{ type: "text", text: `Error: ${error.message}` }]
      };
    }
  }
);

// Tool: Create Delivery
server.tool("create_delivery",
  {
    external_delivery_id: z.string(),
    locale: z.string().optional(),
    order_fulfillment_method: z.string().optional(),
    origin_facility_id: z.string().optional(),
    pickup_address: z.string().optional(),
    pickup_business_name: z.string().optional(),
    pickup_phone_number: z.string().optional(),
    pickup_instructions: z.string().optional(),
    pickup_reference_tag: z.string().optional(),
    pickup_external_business_id: z.string().optional(),
    pickup_external_store_id: z.string().optional(),
    pickup_verification_metadata: z.record(z.any()).optional(),
    dropoff_address: z.string(),
    dropoff_business_name: z.string().optional(),
    dropoff_location: z.record(z.any()).optional(),
    dropoff_phone_number: z.string(),
    dropoff_instructions: z.string().optional(),
    dropoff_contact_given_name: z.string().optional(),
    dropoff_contact_family_name: z.string().optional(),
    dropoff_contact_send_notifications: z.boolean().optional(),
    dropoff_options: z.record(z.any()).optional(),
    dropoff_address_components: z.record(z.any()).optional(),
    dropoff_pin_code_verification_metadata: z.record(z.any()).optional(),
    shopping_options: z.record(z.any()).optional(),
    order_value: z.number().optional(),
    items: z.array(z.record(z.any())).optional(),
    pickup_time: z.string().optional(),
    dropoff_time: z.string().optional(),
    pickup_window: z.record(z.any()).optional(),
    dropoff_window: z.record(z.any()).optional(),
    customer_expected_sla: z.any().optional(),
    expires_by: z.any().optional(),
    shipping_label_metadata: z.record(z.any()).optional(),
    contactless_dropoff: z.boolean().optional(),
    action_if_undeliverable: z.string().optional(),
    tip: z.number().optional(),
    order_contains: z.record(z.any()).optional(),
    dasher_allowed_vehicles: z.array(z.string()).optional(),
    dropoff_requires_signature: z.boolean().optional(),
    promotion_id: z.string().optional(),
    dropoff_cash_on_delivery: z.number().optional(),
    order_route_type: z.string().optional(),
    order_route_items: z.array(z.string()).optional()
  },
  async (params) => {
    try {
      const response = await makeApiRequest(
        'https://openapi.doordash.com/drive/v2/deliveries',
        'POST',
        params
      );
      return {
        content: [{ type: "text", text: String(JSON.stringify(response)) }]
      };
    } catch (error: any) {
      return {
        content: [{ type: "text", text: `Error: ${error.message}` }]
      };
    }
  }
);

// Tool: Get Delivery
server.tool("get_delivery",
  {
    external_delivery_id: z.string()
  },
  async ({ external_delivery_id }) => {
    try {
      const response = await makeApiRequest(
        `https://openapi.doordash.com/drive/v2/deliveries/${external_delivery_id}`,
        'GET'
      );
      return {
        content: [{ type: "text", text: String(JSON.stringify(response)) }]
      };
    } catch (error: any) {
      return {
        content: [{ type: "text", text: `Error: ${error.message}` }]
      };
    }
  }
);

// Tool: Update Delivery
server.tool("update_delivery",
  {
    external_delivery_id: z.string(),
    pickup_address: z.string().optional(),
    pickup_business_name: z.string().optional(),
    pickup_phone_number: z.string().optional(),
    pickup_instructions: z.string().optional(),
    pickup_reference_tag: z.string().optional(),
    pickup_external_business_id: z.string().optional(),
    pickup_external_store_id: z.string().optional(),
    pickup_verification_metadata: z.record(z.any()).optional(),
    dropoff_address: z.string().optional(),
    dropoff_business_name: z.string().optional(),
    dropoff_location: z.record(z.any()).optional(),
    dropoff_phone_number: z.string().optional(),
    dropoff_instructions: z.string().optional(),
    dropoff_contact_given_name: z.string().optional(),
    dropoff_contact_family_name: z.string().optional(),
    dropoff_contact_send_notifications: z.boolean().optional(),
    dropoff_options: z.record(z.any()).optional(),
    dropoff_address_components: z.record(z.any()).optional(),
    dropoff_pin_code_verification_metadata: z.record(z.any()).optional(),
    contactless_dropoff: z.boolean().optional(),
    action_if_undeliverable: z.string().optional(),
    tip: z.number().optional(),
    order_contains: z.record(z.any()).optional(),
    dasher_allowed_vehicles: z.array(z.string()).optional(),
    dropoff_requires_signature: z.boolean().optional(),
    promotion_id: z.string().optional(),
    dropoff_cash_on_delivery: z.number().optional(),
    order_route_type: z.string().optional(),
    order_route_items: z.array(z.string()).optional(),
    order_value: z.number().optional(),
    items: z.array(z.record(z.any())).optional(),
    pickup_time: z.string().optional(),
    dropoff_time: z.string().optional(),
    pickup_window: z.record(z.any()).optional(),
    dropoff_window: z.record(z.any()).optional(),
    customer_expected_sla: z.any().optional(),
    expires_by: z.any().optional(),
    shipping_label_metadata: z.record(z.any()).optional(),
  },
  async ({ external_delivery_id, ...params }) => {
    try {
      const response = await makeApiRequest(
        `https://openapi.doordash.com/drive/v2/deliveries/${external_delivery_id}`,
        'PATCH',
        params
      );
      return {
        content: [{ type: "text", text: String(JSON.stringify(response)) }]
      };
    } catch (error: any) {
      return {
        content: [{ type: "text", text: `Error: ${error.message}` }]
      };
    }
  }
);

// Tool: Cancel Delivery
server.tool("cancel_delivery",
  {
    external_delivery_id: z.string()
  },
  async ({ external_delivery_id }) => {
    try {
      const response = await makeApiRequest(
        `https://openapi.doordash.com/drive/v2/deliveries/${external_delivery_id}/cancel`,
        'PUT'
      );
      return {
        content: [{ type: "text", text: String(JSON.stringify(response)) }]
      };
    } catch (error: any) {
      return {
        content: [{ type: "text", text: `Error: ${error.message}` }]
      };
    }
  }
);

// Tool: Get Items Substitution Recommendation
server.tool("get_items_substitution_recommendation",
  {
    pickup_external_business_id: z.string(),
    pickup_external_store_id: z.string(),
    items: z.array(z.record(z.any())),
    customer: z.record(z.any()).optional()
  },
  async (params) => {
    try {
      const response = await makeApiRequest(
        'https://openapi.doordash.com/drive/v2/items_substitution_recommendation',
        'POST',
        params
      );
      return {
        content: [{ type: "text", text: String(JSON.stringify(response)) }]
      };
    } catch (error: any) {
      return {
        content: [{ type: "text", text: `Error: ${error.message}` }]
      };
    }
  }
);

// Tool: Create Checkout Audit Signal
server.tool("create_checkout_audit_signal",
  {
    external_delivery_id: z.string(),
    is_audit_successful: z.boolean(),
    audit_period: z.record(z.any()).optional(),
    requested_audit_item_count: z.number().optional(),
    audited_item_count: z.number().optional(),
    successful_audit_items: z.array(z.record(z.any())).optional(),
    failed_audit_items: z.array(z.record(z.any())).optional(),
    checkout_audit_status: z.string().optional()
  },
  async (params) => {
    try {
      const response = await makeApiRequest(
        'https://openapi.doordash.com/drive/v2/checkout_audit_signal',
        'POST',
        params
      );
      return {
        content: [{ type: "text", text: String(JSON.stringify(response)) }]
      };
    } catch (error: any) {
      return {
        content: [{ type: "text", text: `Error: ${error.message}` }]
      };
    }
  }
);

// Tool: Get Business
server.tool("get_business",
  {
    external_business_id: z.string()
  },
  async ({ external_business_id }) => {
    try {
      const response = await makeApiRequest(
        `https://openapi.doordash.com/developer/v1/businesses/${external_business_id}`,
        'GET'
      );
      return {
        content: [{ type: "text", text: String(JSON.stringify(response)) }]
      };
    } catch (error: any) {
      return {
        content: [{ type: "text", text: `Error: ${error.message}` }]
      };
    }
  }
);

// Tool: Update Business
server.tool("update_business",
  {
    external_business_id: z.string(),
    name: z.string().optional(),
    description: z.string().optional(),
    activation_status: z.string().optional()
  },
  async ({ external_business_id, name, description, activation_status }) => {
    try {
      const response = await makeApiRequest(
        `https://openapi.doordash.com/developer/v1/businesses/${external_business_id}`,
        'PATCH',
        { name: name, description: description, activation_status: activation_status }
      );
      return {
        content: [{ type: "text", text: String(JSON.stringify(response)) }]
      };
    } catch (error: any) {
      return {
        content: [{ type: "text", text: `Error: ${error.message}` }]
      };
    }
  }
);

// Tool: List Businesses
server.tool("list_businesses",
  {
    activationStatus: z.string().optional(),
    continuationToken: z.string().optional()
  },
  async ({ activationStatus, continuationToken }) => {
    try {
      let url = 'https://openapi.doordash.com/developer/v1/businesses';
      const params = new URLSearchParams();
      if (activationStatus) {
        params.append('activationStatus', activationStatus);
      }
      if (continuationToken) {
        params.append('continuationToken', continuationToken);
      }
      if (params.toString()) {
        url += `?${params.toString()}`;
      }
      const response = await makeApiRequest(url, 'GET');
      return {
        content: [{ type: "text", text: String(JSON.stringify(response)) }]
      };
    } catch (error: any) {
      return {
        content: [{ type: "text", text: `Error: ${error.message}` }]
      };
    }
  }
);

// Tool: Get Store
server.tool("get_store",
  {
    external_business_id: z.string(),
    external_store_id: z.string()
  },
  async ({ external_business_id, external_store_id }) => {
    try {
      const response = await makeApiRequest(
        `https://openapi.doordash.com/developer/v1/businesses/${external_business_id}/stores/${external_store_id}`,
        'GET'
      );
      return {
        content: [{ type: "text", text: String(JSON.stringify(response)) }]
      };
    } catch (error: any) {
      return {
        content: [{ type: "text", text: `Error: ${error.message}` }]
      };
    }
  }
);

// Tool: Update Store
server.tool("update_store",
  {
    external_business_id: z.string(),
    external_store_id: z.string(),
    name: z.string().optional(),
    phone_number: z.string().optional(),
    address: z.string().optional()
  },
  async ({ external_business_id, external_store_id, name, phone_number, address }) => {
    try {
      const response = await makeApiRequest(
        `https://openapi.doordash.com/developer/v1/businesses/${external_business_id}/stores/${external_store_id}`,
        'PATCH',
        { name: name, phone_number: phone_number, address: address }
      );
      return {
        content: [{ type: "text", text: String(JSON.stringify(response)) }]
      };
    } catch (error: any) {
      return {
        content: [{ type: "text", text: `Error: ${error.message}` }]
      };
    }
  }
);

// Tool: Create Store
server.tool("create_store",
  {
    external_business_id: z.string(),
    external_store_id: z.string(),
    name: z.string(),
    phone_number: z.string(),
    address: z.string()
  },
  async ({ external_business_id, external_store_id, name, phone_number, address }) => {
    try {
      const response = await makeApiRequest(
        `https://openapi.doordash.com/developer/v1/businesses/${external_business_id}/stores`,
        'POST',
        { external_store_id: external_store_id, name: name, phone_number: phone_number, address: address }
      );
      return {
        content: [{ type: "text", text: String(JSON.stringify(response)) }]
      };
    } catch (error: any) {
      return {
        content: [{ type: "text", text: `Error: ${error.message}` }]
      };
    }
  }
);

// Tool: List Stores
server.tool("list_stores",
  {
    external_business_id: z.string(),
    activationStatus: z.string().optional(),
    continuationToken: z.string().optional()
  },
  async ({ external_business_id, activationStatus, continuationToken }) => {
    try {
      let url = `https://openapi.doordash.com/developer/v1/businesses/${external_business_id}/stores`;
      const params = new URLSearchParams();
      if (activationStatus) {
        params.append('activationStatus', activationStatus);
      }
      if (continuationToken) {
        params.append('continuationToken', continuationToken);
      }
      if (params.toString()) {
        url += `?${params.toString()}`;
      }
      const response = await makeApiRequest(url, 'GET');
      return {
        content: [{ type: "text", text: String(JSON.stringify(response)) }]
      };
    } catch (error: any) {
      return {
        content: [{ type: "text", text: `Error: ${error.message}` }]
      };
    }
  }
);

// Start receiving messages on stdin and sending messages on stdout
const transport = new StdioServerTransport();
await server.connect(transport);